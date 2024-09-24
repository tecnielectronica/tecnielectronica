import app from './app';
import './database';
import './libs/initialSetup';

app.listen(4000);
console.log('Server listening on port', 4000);