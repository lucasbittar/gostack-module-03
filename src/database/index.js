import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import Appointment from '../app/models/Appointment';
import File from '../app/models/File';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [Appointment, File, User];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    const connect = async () => {
      console.log(`Connecting to DB -> ${databaseConfig.database}...`);
      return (this.connection = new Sequelize(databaseConfig));
    };
    connect()
      .then(() => {
        console.log(`${databaseConfig.database} connected!`);
        models
          .map(model => model.init(this.connection))
          .map(
            model => model.associate && model.associate(this.connection.models)
          );
      })
      .catch(e => {
        console.log('Something went wrong: ', e.message);
      });
  }

  mongo() {
    const connect = async () => {
      console.log(`Connecting to DB -> Mongoose...`);
      return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      });
    };
    connect()
      .then(() => {
        console.log('MongoDB connected!');
      })
      .catch(e => {
        console.log('Something went wrong: ', e.message);
      });
  }
}

export default new Database();
