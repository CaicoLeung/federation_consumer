import { memo } from 'react';
import './App.css';
import { loadRemote } from '@module-federation/enhanced/runtime'
import RemoteSubAppButton from 'federation_provider/button'
import type RemoteSubAppType from 'federation_provider/export-app'
import type RemoteSubVue3AppType from 'federation_provider_vue3/export-app'
import { createRemoteComponent } from '@module-federation/bridge-react';
import { BrowserRouter, Route, Routes } from '@module-federation/bridge-react/router';

const FallbackErrorComp = (info: any) => {
  return (
    <div>
      <h2>This is ErrorBoundary Component</h2>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{info?.error.message}</pre>
      <button type='button' onClick={() => info?.resetErrorBoundary()}>
        resetErrorBoundary(try again)
      </button>
    </div>
  )
}

const FallbackComp = <div data-test-id="loading">loading</div>

const RemoteSubApp = createRemoteComponent({
  loader: () => loadRemote<typeof RemoteSubAppType>('federation_provider/export-app'),
  loading: FallbackComp,
  fallback: FallbackErrorComp,
})

const RemoteSubVue3App = createRemoteComponent({
  loader: () => loadRemote<typeof RemoteSubVue3AppType>('federation_provider_vue3/export-app'),
  loading: FallbackComp,
  fallback: FallbackErrorComp,
})

const Home = memo(() => (
  <div className="content">
    <h1>I am MF Main App</h1>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      <RemoteSubAppButton color='black' />
      <a href='/sub'>go to sub app</a>
      <a href='/sub-vue3'>go to sub app vue3</a>
    </div>
  </div>
))

const App = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path='/sub' Component={RemoteSubApp} />
        <Route path='/sub-vue3/*' Component={RemoteSubVue3App} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
