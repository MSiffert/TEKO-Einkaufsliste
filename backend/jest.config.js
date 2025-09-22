module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: {
                module: 'CommonJS',
                target: 'ES2020',
                moduleResolution: 'Node',
                esModuleInterop: true,
                strict: true,
                skipLibCheck: true
            }
        }]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json']
};
