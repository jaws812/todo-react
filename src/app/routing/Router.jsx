import {useEffect, useState} from "react";

const matchPath = (path, route) => {
  const pathParts = path.split('/') // '/tasks/123' => ['', 'tasks', '123']
  const routePaths = route.split('/') // '/tasks/:id' => ['', 'tasks', ':id']

  if (pathParts.length !== routePaths.length) {
    return null
  }

  const params = {}

  for (let i = 0; i < routePaths.length; i++) {
    if (routePaths[i].startsWith(':')) {
      const paramName = routePaths[i].slice(1)

      params[paramName] = pathParts[i]
    } else if (routePaths[i] !== pathParts[i]) {
      return null
    }
  }

  return params
}

export const useRoute = () => {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', onLocationChange)

    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
  }, []);

  return path
}

const Router = (props) => {
  const {routes} = props
  const path = useRoute()

  for (const route in routes) {
    const params = matchPath(path, route)

    if(params){
      const Page = routes[route]

      return <Page params={params}/>
    }
  }

  const NotFound = routes['*']

  return <NotFound />
}

export default Router