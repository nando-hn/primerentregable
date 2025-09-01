import { AppRegistry } from 'react-native';
import App from './App';

// Opción A (recomendada): sin importar app.json
AppRegistry.registerComponent('MiPrimeraApp', () => App);

/* Opción B (si prefieres usar app.json)
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);
*/
 