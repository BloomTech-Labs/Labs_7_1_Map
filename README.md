# Scratch-N-Map
(Lambda Labs 7.1)

## Code style
- Single quotes
- 2 spaces indentation
- async/await
- PropTypes
- Spaces within single-line objects

### Naming conventions:

Front End
```javascript
const AwesomePerson = () => {
  return (
    // 'className' is the same as Component's name
    <div className="AwesomePerson">
      // Nested divs start with 'ParentName__'
      <div className="AwesomePerson__home">
        <div className="home__livingroom ">
          Blah Blah Living room Blah
        </div>
        // Modifiers will have a dash
        <div className="home__kitchen-modifier ">
          Blah Blah kitchen with modifier Blah
        </div>
      </div>
    </div>
  )
}
```


## Dependencies
Front End
- react
- redux
- redux-thunk
- react-router
- react-redux
- prop-types
- axios

Back End
- express
- mongoose
- cors
- helmet
- morgan
- axios
- passport
- passport-local
- passport-jwt
- jsonwebtoken
- dotenv

Dev Dependencies
- ESLint
- eslint-config-prettier
- eslint-plugin-react (client only)
- eslint-plugin-node (server only)
- Prettier
- Jest

## Contributers
Engineering Team:
- Edward Manda
- David Morales
- Nalee Riddell
- Sneha Thadani
- Nikhil Kamineni

Project Manager
- Punit Rawal
