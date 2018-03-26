# React Generator

The goal of this npm module is to aide in the creation of react applications by giving you command line functionality to generate basic react files (components, reducers and specs) in a standard format utilizing best practices.

Start by
```
npm install --global
```

---

## Generating Files

Files are created in your present working directory so please navigate to the correct location in order to ensure the correct placement of the generated file.

All commands follow a standard for generating a file:
```
$ react-generator file_type relative/location/ComponentOrReducerName options..
```

* Component
```
$ react-generator component ./src/Brain speed:number thoughts:object! createdAt:date notsureofthetype --t --s currentlyThinking onMeds
```

This command would generate a react component called Brain saved to (cwd)/Brain.jsx. The component would have four properties being passed into it (speed, thoughts, createdAt, notsureofthetype) all with corresponding React.propTypes except for the last one because it lacks the ':(propType)'. Any PropType ending in a ! will be a required propType.

* Component Spec
```
$ react-generator componentSpec ./src/Brain speed:number thoughts:object! createdAt:date notsureofthetype
```

Lorem ipsum working on it. The component would have four properties react reducer saved write them on the command as such. This command would generate a react reducer present working directory so please navigate to the correct location in order to ensure the correct placement of the generated.


* Reducer
```
$ react-generator reducer ./src/Thoughts think eat breathe drink sleep
```
This command would generate a react reducer saved to (cwd)/ThoughtsReducer.js. The reducer would be created with five actions - one for each of the words after 'Thoughts'. All actions would be trasformed to uppercase so no need to write them on the command as such.


* Reducer Spec
```
$ react-generator reducerSpec ./src/Thoughts think eat breathe drink sleep
```

This command would generate a react reducer saved to (cwd)/ThoughtsReducer.spec.js. The reducer spec would be created with five it blocks - one for each of the words after 'Thoughts'.




TODOs
* minify files
* flag to create a connected component vs dumb component
* prompt to create a spec if component or reducer generated
