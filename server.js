const 
    courses = require( './courses' ),
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
        resolvers: {
            // parentObject (rootValue) Raiz de consultas de GraphQL
            Query: {
                getCourses( parentObject, { page, limit } ) {
                    if( page !== undefined ) {
                        console .log( 'pagina', page, 'muestra', limit );
                        return courses .slice( ( page - 1 ) * limit, ( page ) * limit );
                    }
                    
                    return courses;
                }
            }        
        }
    }),
    /** Asocia Instancia de Apollo Server con el Schema */
    server = new ApolloServer({                         
        schema: mySchema                                    // Schema
    });

/** Lanza Servidor */
server .listen() .then( ({ url }) => {
    console .log( `Servidor Apollo iniciado en ${ url }`)
});
