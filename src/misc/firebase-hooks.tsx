import * as React from "react"
import firebase from 'firebase/app'
import { FieldPath, WhereFilterOp } from "@google-cloud/firestore"

export function useDocumentData<Type>( path: string ):
[ Type, boolean, firebase.firestore.FirestoreError ] {
    /* Value is what gets returned */
    const [ value, setValue ] = React.useState( null as Type )

    /* Loading is true if data is yet to be retrieved */
    const [ loading, setLoading ] = React.useState( true )

    /* Error holds any error that may come back from firebase */
    const [ error, setError ] = React.useState(
        null as firebase.firestore.FirestoreError
    )

    /* Effect so the listener is only set once */
    React.useEffect( () => {
        const doc = firebase.app().firestore().doc( path )
        const unsubscribe = doc.onSnapshot(
            snapshot => {
                setLoading( false )
                setValue( snapshot.data() as Type )
            },
            error => {
                setLoading( false )
                setError( error )
            }
        )

        return unsubscribe
    }, [ path ] )

    return [ value, loading, error ]
}

export type QueryType = [ string | FieldPath, WhereFilterOp, any ]
export function useCollection<Type>(
    path: string,
    queries: QueryType[]
): [ Type[], boolean, firebase.firestore.FirestoreError ] {
    const [ collection, setCollection ] = React.useState( [] as Type[] )

    /* Loading is true if data is yet to be retrieved */
    const [ loading, setLoading ] = React.useState( true )

    /* Error holds any error that may come back from firebase */
    const [ error, setError ] = React.useState(
        null as firebase.firestore.FirestoreError
    )

    /* Effect so the listener is only set once */
    React.useEffect( () => {
        let coll = firebase.app().firestore().collection( path )
        let queryRes: firebase.firestore.Query<firebase.firestore.DocumentData>

        const emptyVal = queries.some( q => {
            if( !q[ 2 ] ) {
                return true
            }
            else if( Array.isArray( q[ 2 ] ) && !q[ 2 ].length ) {
                return true
            }
        } )

        if( emptyVal ) {
            return
        }

        queries.forEach( query => {
            queryRes = ( queryRes || coll ).where( ...query )
        } )

        const unsubscribe = queryRes.onSnapshot(
            /* TODO: Use docChanges() to use fewer reads */
            snapshot => {
                const coll = snapshot.docs.map( doc => doc.data() )
                setLoading( false )
                setCollection( coll as Type[] )
            },
            error => {
                setLoading( false )
                setError( error )
            }
        )

        return unsubscribe
    }, [ path, JSON.stringify( queries ) ] )

    return [ collection, loading, error ]
}