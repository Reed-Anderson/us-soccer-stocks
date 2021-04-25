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
        doc.onSnapshot(
            snapshot => {
                setLoading( false )
                setValue( snapshot.data() as Type )
            },
            error => {
                setLoading( false )
                setError( error )
            }
        )
    }, [ path ] )

    return [ value, loading, error ]
}

export function useCollection<Type>(
    path: string,
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp,
    value: any
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
        firebase
            .app()
            .firestore()
            .collection( path )
            .where( fieldPath, opStr, value )
            .onSnapshot(
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
    }, [ path, fieldPath, opStr, value ] )

    return [ collection, loading, error ]
}