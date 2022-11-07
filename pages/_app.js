import '../styles/globals.css'
// import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps: {session, ...pageProps} }) {

  // if(Component.getLayout){
  //   return Component.getLayout(<Component {...pageProps} />)
  // }

  const Layout = Component.Layout || EmptyLayout

  return(
    // <SessionProvider session={session} refetchOnWindowFocus={true} refetchInterval={0}>
      <Layout >
        <Component {...pageProps} />
      </Layout>

    // </SessionProvider>
  ) 
}

const EmptyLayout = ({children}) => <>{children}</>

export default MyApp
