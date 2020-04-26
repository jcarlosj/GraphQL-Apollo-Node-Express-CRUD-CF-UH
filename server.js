const 
    /** Dependencies */
    { ApolloServer } = require( 'apollo-server' ),      
    { makeExecutableSchema } = require( 'graphql-tools' ),
    /** Type Definitions */
    typeDefs = `
        type Course {
            id: ID!
            title: String!
            views: Int
        }
        type Query {
            getCourses( page: Int, limit: Int = 1 ) : [ Course ]
        }
    `,
    /** Crea Schema */
    mySchema = makeExecutableSchema({
        typeDefs: typeDefs,
        resolvers: {}
    }),
    /** Asocia Instancia de Apollo Server con el Schema */
    server = new ApolloServer({                         
        schema: mySchema                                    // Schema
    });

/** Lanza Servidor */
server .listen() .then( ({ url }) => {
    console .log( `Servidor Apollo iniciado en ${ url }`)
});
