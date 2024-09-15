import { lazy, memo } from 'react';
import './App.css';
import { init, loadRemote } from '@module-federation/enhanced/runtime'
import type ProviderButton from 'federation_provider/button'
import type Provider from 'federation_provider/export-app'
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
  loader: () => loadRemote<typeof Provider>('federation_provider/export-app'),
  loading: FallbackComp,
  fallback: FallbackErrorComp,
})

init({
  name: 'federation_consumer',
  remotes: [
    {
      name: 'federation_provider',
      entry: 'http://localhost:3000/mf-manifest.json',
    }
  ],
  shared: {
    react: { version: '18.0.0', scope: 'default' },
    'react-dom': { version: '18.0.0', scope: 'default' },
  },
})

const Button = lazy(() => loadRemote<{ default: typeof ProviderButton }>('federation_provider/button'))

const Home = memo(() => (
  <div className="content">
    <h1>I am MF Main App</h1>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      <Button color='black' />
      <a href='/sub'>go to sub app</a>
    </div>
  </div>
))

const App = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path='/sub' Component={RemoteSubApp} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
