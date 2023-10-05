import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import creatSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reducers from './redux/reducers';
import { myAnalysisSaga, myDetailSaga, myScheduleSaga, myScheduleSingleSaga, myStatsSaga, myoddHistorySaga, myoddsSaga } from './redux/sagas';

const sagaMiddleware = creatSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(myScheduleSaga);
sagaMiddleware.run(myScheduleSingleSaga);
sagaMiddleware.run(myoddsSaga);
sagaMiddleware.run(myoddHistorySaga);
sagaMiddleware.run(myStatsSaga);
sagaMiddleware.run(myDetailSaga);
sagaMiddleware.run(myAnalysisSaga);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
