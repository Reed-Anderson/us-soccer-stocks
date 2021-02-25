import { app } from "firebase-admin"

export const getDocument = ( documentPath: string ) => {
    const doc = app().firestore().doc( documentPath )

    return new Promise( resolve => {
        doc.onSnapshot( snapshot => {
            if( snapshot.exists ) {
                resolve( snapshot.data() )
            }
            else {
                resolve( null )
            }
        } )
    } )
}

type getCollectionType = Promise<FirebaseFirestore
    .QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[]>

export const getCollection = ( collectionPath: string ): getCollectionType => {
    const doc = app().firestore().collection( collectionPath )

    return new Promise( resolve => {
        doc.onSnapshot( snapshot => {
            resolve( snapshot.docs )
        } )
    } )
}