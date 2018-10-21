# React Generator

The goal of this npm module is to aid in the creation of react applications by giving you command line functionality to generate basic react files (components, reducers and specs) in a standard format utilizing best practices.

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
$ react-generator component ./src/Brain speed:number thoughts:object! createdAt:date notsureofthetype --t --s currentlyThinking:true thought:\'This is awesome\'
```

This command would generate a react component called Brain saved to (cwd)/src/Brain.jsx. The component would have four properties being passed into it (speed, thoughts, createdAt, notsureofthetype) all with corresponding React.propTypes except for the last one because it lacks the `:(propType)`. Any PropType ending in a ! will be a required propType. `--t` is a flag for producing a test for the component. Without the flag, you will be prompted to produce a spec via a `(y/n)` formatted response. Any arguments after `--s` will be added to the component as state properties.

* Component Spec
```
$ react-generator componentSpec ./src/Brain speed:number thoughts:object! createdAt:date notsureofthetype
```

The component would have four properties react reducer saved write them on the command as such. This command would generate a react reducer present working directory so please navigate to the correct location in order to ensure the correct placement of the generated.


* Reducer
```
$ react-generator reducer ./src/Thoughts think eat breathe drink sleep
```
Not working currently. This command would generate a react reducer saved to (cwd)/ThoughtsReducer.js. The reducer would be created with five actions - one for each of the words after 'Thoughts'. All actions would be trasformed to uppercase so no need to write them on the command as such.


* Reducer Spec
```
$ react-generator reducerSpec ./src/Thoughts think eat breathe drink sleep
```

Not working currently. This command would generate a react reducer saved to (cwd)/ThoughtsReducer.spec.js. The reducer spec would be created with five it blocks - one for each of the words after 'Thoughts'.

---

## Contributing to the Project

Please branch off `master` and submit a PR to be considered for a merge into master.

After edits have been made, use `npm run build` to build the files and then `npm install -g` to install the package and test.



TODOs
- [ ] minify files
- [ ] add tests for functions
- [ ] handling if file-type not written
- [x] after file written, if also requiring test, don't allow console.log to write on line to overwrite test file
- [ ] flag to create a connected component vs dumb component
- [x] prompt to create a spec if component generated
- [ ] prompt to create a spec if reducer generated
