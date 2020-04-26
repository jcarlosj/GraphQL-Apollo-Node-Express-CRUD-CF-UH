let courses = require( './courses' );
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
        type Alert {
            message: String
        }
        input CourseInput {
            title: String!
            views: Int
        }
        type Query {
            getCourses( page: Int, limit: Int = 1 ) : [ Course ]
        }
        type Mutation {
            addCourse( input: CourseInput ) : Course
            updateCourse( id: ID!, input: CourseInput ) : Course
            deleteCourse( id: ID! ) : Alert
        }
    `,
    /** Crea Schema */
    mySchema = makeExecutableSchema({
        typeDefs,   // Short Hand Properties
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
            }, 
            Mutation: {
                // parentObject valor resuelto por el resolver padre, equivalente al rootValue de GraphQL
                addCourse( parentObject, { input }) {
                    const 
                        { title, views } = input,       // Destructuring
                        id = courses .length + 1,
                        course = { id, title, views };
        
                    courses .push( course );

                    return course;
                },
                updateCourse( parentObject, { id, input } ) {
                    const 
                        index = courses .findIndex( course => id == course .id );
                        course = courses[ index ],
                        newCourse = Object .assign( course, input );     // Spread
                    
                    courses[ index ] = newCourse;
        
                    return newCourse;
                },
                deleteCourse( parentObject, { id }) {
                    courses = courses .filter( course => id != course .id );
        
                    return { message: `El curso con id ${ id } fue eliminado` }
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
