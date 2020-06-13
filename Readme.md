# COVID19 Visualisation

My fun project to visualise COVID19 dataset from [Datahub.io](https://datahub.io/core/covid-19) and [Our world in data](https://github.com/owid/covid-19-data/tree/master/public/data).

## Getting Started

To get the data that is required for this visualisation you need to have run the [crawler](https://github.com/martindavid/covid19-data-crawler) first.

- Before you run the below command, make sure to create a copy of `.env.example` and rename it to `.env`. Adjust the value inside that file to the environment in your machine.

  ```
  DB_HOST=
  DB_USER=
  DB_PASSWORD=
  DB_PORT=
  DB_NAME=
  ```

```
# Clone the repo
$ git clone git@github.com:martindavid/covid19-visualisation.git

# Install the dependencies
$ cd covid19-visualisation
$ npm install

# Run in dev mode
$ npm run dev
```
