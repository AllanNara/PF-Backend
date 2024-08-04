## [2.0.0](https://github.com/AllanNara/PF-Backend/compare/v1.4.0...v2.0.0) (2024-08-04)

### ⚠ BREAKING CHANGES

* **api:** not more handlebars for this moment
* **api:** differents folders in proyect
* **db:** now add NODE_ENV and script mongo for server

### Features

* **api:** add custom logger with winston ([de9e369](https://github.com/AllanNara/PF-Backend/commit/de9e369fe910e50b0180c788ea4c94a711688318))
* **api:** add mongo persistence ([a2f67ac](https://github.com/AllanNara/PF-Backend/commit/a2f67acfc793753790f78b058a3aa05ef3a589de))
* **api:** add pagination with mongoose and fs ([698a15b](https://github.com/AllanNara/PF-Backend/commit/698a15b16296255f18e70700a2a566cb53323c69))
* **api:** add PUT and DELETE endpoints on /api/carts ([527fd96](https://github.com/AllanNara/PF-Backend/commit/527fd96976ebde81657414fc0a3e1e55b015cb4c))
* **db:** add mongoose ([ee8ec2a](https://github.com/AllanNara/PF-Backend/commit/ee8ec2aced058fca2f9da079ec42fe57ce331666))
* **docs:** finished documentatition ([f682b47](https://github.com/AllanNara/PF-Backend/commit/f682b47bff0576c77c1953b9c5a65577c4f094d6))

### Bug Fixes

* fix carrousel ([a4fcad1](https://github.com/AllanNara/PF-Backend/commit/a4fcad1de3fc26060d5d51d9fa10002ff864aa8f))
* **fs:** fix CartManager functions with error on parseInt numbers ([7585d73](https://github.com/AllanNara/PF-Backend/commit/7585d735ae023eb256baad74d5df91cb4ab41823))

### Chores

* add logger with 'winston' package ([64c16d4](https://github.com/AllanNara/PF-Backend/commit/64c16d4e44c4468cf78858aae5b12a6e0e28e051))
* change message in response ([c2ab37e](https://github.com/AllanNara/PF-Backend/commit/c2ab37e48f9e8fb92e4d282bf130c889ec7f65bb))
* modified gitignore ([021460b](https://github.com/AllanNara/PF-Backend/commit/021460b4f6dad584a0aaddf8ddf10e7c656e42c7))

### Documentation

* add CHANGELOG.md ([12e3662](https://github.com/AllanNara/PF-Backend/commit/12e3662a4aaff299e478eb2b7f15b56058e6ea00))
* **docs:** add doc with redocly ([69dc37e](https://github.com/AllanNara/PF-Backend/commit/69dc37e5cfa127678b9428883276915088dc95bd))
* **docs:** add documentation with swagger and use redocly/cli ([f4e919c](https://github.com/AllanNara/PF-Backend/commit/f4e919c6262abad4c7e8c2eda7ae41163a746ba3))
* **docs:** add examples and finished jerarquy folders ([13ccfdb](https://github.com/AllanNara/PF-Backend/commit/13ccfdb004221a20e352b90e243ef7b363d4fbb3))
* update changelog ([37753b0](https://github.com/AllanNara/PF-Backend/commit/37753b05abbac2e372cd4008c49ef3224b480885))

### Code Refactoring

* add pattern factory and reestructure folders ([09cc203](https://github.com/AllanNara/PF-Backend/commit/09cc203cfc8c5b04526386f0f3302a18eef4e3e2))
* **api:** change main file for start server (server.js). Reason this is added testing files ([27557db](https://github.com/AllanNara/PF-Backend/commit/27557db0718087d879f279a784d0ea49b16d0d73))
* **api:** general refactoring ([a749304](https://github.com/AllanNara/PF-Backend/commit/a749304b374d1d9b3f5ecd3bbe72f1b11239d89a))
* **docs:** refactoring documentation folder structure ([a566ee0](https://github.com/AllanNara/PF-Backend/commit/a566ee059fc9506566ebe6389e1f7eae28c196a4))
* fix bugs and check correct implementation for multer ([fef54e2](https://github.com/AllanNara/PF-Backend/commit/fef54e2c2e097bbcf5860c39d9974bca8ac463bd))
* refactor winston and folders ([6af1cd2](https://github.com/AllanNara/PF-Backend/commit/6af1cd2281d7f78c2d24047f9693229632129760))

### Tests

* add seeders and script ([c0c20af](https://github.com/AllanNara/PF-Backend/commit/c0c20afc5fef8670aa8b3f5cd464dcbdffbf6d84))
* **routes:** add unit testing in /api/products ([0a591a5](https://github.com/AllanNara/PF-Backend/commit/0a591a585fa51eaba0411fd823b08132480ef133))
# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.0.0](https://github.com/AllanNara/PF-Backend/compare/v1.4.0...v2.0.0) (2024-08-04)


### ⚠ BREAKING CHANGES

* **api:** not more handlebars for this moment
* **api:** differents folders in proyect
* **db:** now add NODE_ENV and script mongo for server

### Features

* **api:** add custom logger with winston ([de9e369](https://github.com/AllanNara/PF-Backend/commit/de9e369fe910e50b0180c788ea4c94a711688318))
* **api:** add mongo persistence ([a2f67ac](https://github.com/AllanNara/PF-Backend/commit/a2f67acfc793753790f78b058a3aa05ef3a589de))
* **api:** add pagination with mongoose and fs ([698a15b](https://github.com/AllanNara/PF-Backend/commit/698a15b16296255f18e70700a2a566cb53323c69))
* **api:** add PUT and DELETE endpoints on /api/carts ([527fd96](https://github.com/AllanNara/PF-Backend/commit/527fd96976ebde81657414fc0a3e1e55b015cb4c))
* **db:** add mongoose ([ee8ec2a](https://github.com/AllanNara/PF-Backend/commit/ee8ec2aced058fca2f9da079ec42fe57ce331666))
* **docs:** finished documentatition ([f682b47](https://github.com/AllanNara/PF-Backend/commit/f682b47bff0576c77c1953b9c5a65577c4f094d6))


### Bug Fixes

* fix carrousel ([a4fcad1](https://github.com/AllanNara/PF-Backend/commit/a4fcad1de3fc26060d5d51d9fa10002ff864aa8f))
* **fs:** fix CartManager functions with error on parseInt numbers ([7585d73](https://github.com/AllanNara/PF-Backend/commit/7585d735ae023eb256baad74d5df91cb4ab41823))

## [1.4.0](https://github.com/AllanNara/PF-Backend/compare/v1.2.1...v1.4.0) (2024-07-02)

### Features

* **client:** add express-handlebars and config ([412fde7](https://github.com/AllanNara/PF-Backend/commit/412fde75dea2027c5426fc83f59dd9d8164953f9))
* **client:** add websockets ([7bb6478](https://github.com/AllanNara/PF-Backend/commit/7bb64783c6910d5d7098e980072cb28829f1dd45))
* **client:** all realtimeproducts file ([04d0d19](https://github.com/AllanNara/PF-Backend/commit/04d0d19d52dfeccb1e807bf3e44d92b198e29d0d))
* **statics:** add multer middleware in products ([a52ddd0](https://github.com/AllanNara/PF-Backend/commit/a52ddd0d512165241746e968faad8ae5f8f31b42))

### Chores

* **release:** 1.3.0 ([aedcc9d](https://github.com/AllanNara/PF-Backend/commit/aedcc9d841408c10afc1be779b8e2193ff711ddb))
* **release:** 1.4.0 ([1479171](https://github.com/AllanNara/PF-Backend/commit/14791713ee595573aea5d77c81414ac2d7290a0f))

### Documentation

* **config:** add changelog ([10bd7e4](https://github.com/AllanNara/PF-Backend/commit/10bd7e4f4e35617d00a96a7186c7ba8edd447963))
* **root:** add license and more description on package.json ([167be0d](https://github.com/AllanNara/PF-Backend/commit/167be0d480de7129144dc23adac667ee2c7dbf34))

### Code Refactoring

* **web:** add form and connect with hbs ([a959146](https://github.com/AllanNara/PF-Backend/commit/a9591465c437353e87e88d9bf3d4da7d99537b6d))
## [1.2.1](https://github.com/AllanNara/PF-Backend/compare/v1.2.0...v1.2.1) (2024-06-29)

### Chores

* **release:** 1.2.1 ([976ac74](https://github.com/AllanNara/PF-Backend/commit/976ac7432fd06273a1b1d545db9654f44cde05c1))

### Continuous Integration

* **config:** add differents scripts on package.json ([a302511](https://github.com/AllanNara/PF-Backend/commit/a30251184c2de7c9c137bb7aafae52b4ce49e390))
## [1.2.0](https://github.com/AllanNara/PF-Backend/compare/ba105706d5f8b4166e0538ed0758e65d9c1531dc...v1.2.0) (2024-06-29)

### Features

* add commitizen ([afaf8fa](https://github.com/AllanNara/PF-Backend/commit/afaf8fa82ffa66116cd011ebd2581e6ad3f39de1))
* primera pre-entrega resuelta ([43be6da](https://github.com/AllanNara/PF-Backend/commit/43be6dae3647fb626a479df6356fcfb63b37944e))

### Bug Fixes

* remove script test ([f599321](https://github.com/AllanNara/PF-Backend/commit/f5993212995851f83b0b04234fc42314ec97ec78))

### Chores

* :memo: add README.md ([ba10570](https://github.com/AllanNara/PF-Backend/commit/ba105706d5f8b4166e0538ed0758e65d9c1531dc))
* **release:** 1.2.0 ([bb7464e](https://github.com/AllanNara/PF-Backend/commit/bb7464e9af4520c9176c79dcfb6a3a390aebe549))
