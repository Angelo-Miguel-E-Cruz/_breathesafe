**CLICK ON EDIT FILE TO VIEW DATABASE STRUCTURE PROPERLY**

Things needed:
1. npm and dependencies
   - npm download link: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

2. MySQL and a way to view data (MySQL Workbench)
   - MySQL download link: https://dev.mysql.com/downloads/installer/

after setting up MySQL, under backend > index.js, change database password on line 17

database structure

sensor_db
| - - employees_tb
  | - - column name         - data type        - additional properties
  | - - id                  - int              - primary key - not null - auto increment
  | - - emp_id              - varchar(100)     - not null - unique
  | - - device_id           - varchar(30)      - not null - unique
  | - - emp_name            - varchar(100)     - not null
  | - - emp_gender          - varchar(6)       - not null
  | - - emp_age             - int              - not null
  | - - latest_25           - float            - not null
  | - - latest_10           - float            - not null
  | - - latest_aqi_25       - float            - not null
  | - - latest_aiq_10       - float            - not null
| - - sensor_data
  | - - column name         - data type        - additional properties
  | - - id                  - int              - primary key - not null - auto increment
  | - - pm25                - float
  | - - pm10                - float
  | - - aqi_pm25            - int
  | - - aqi_pm10            - int
  | - - aqi_pm25_category   - varchar(30)
  | - - aqi_pm10_category   - varchar(30)
  | - - device_id           - varchar(50)
  | - - timestamp           - timestamp       - default/expression: current_timestamp

dependencies:
  1. backend
     - cors
     - express
     - mysql2
     - nodemon
  2. frontend :
     - tailwind (npm install tailwindcss @tailwindcss/vite) <- use this instead of instruction below
     - daisyui (npm i -D daisyui@beta) <- use this instead of instruction below
     - axios
     - clsx
     - react
     - react-router-dom
     - react-icons
     - recharts
       
to install dependencies:
1. open in visual studio code
2. right click backend and click "Open in Integrated Terminal"
3. type "npm install *names of dependencies*"
4. right click _breathesafe (under frontend) and click "Open in Integrated Terminal"
5. type "npm install *names of dependencies*"

NOTE: If any dependencies fail to download, please search for "*dependency name* install npm"
