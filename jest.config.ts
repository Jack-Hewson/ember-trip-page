export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$" : "ts-jest"
    },
    moduleNameMapper: {
        '\\..\(gif|ttf|eot|svg|png|css)$': 'src/test/__mocks__/fileMock.js'
    }
}