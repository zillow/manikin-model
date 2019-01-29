# API

## [computed](methods/computed.md)

A method for creating computed properties on an Manikin modal.

## [createModel](methods/createModel.md)

A method for creating a Manikin model based on your provided model name and schema

## [ManikinObject](classes/ManikinObject.md)

The class that all Manikin models are extended from.

## Features

### [Asserting Unknown Properties](plugins/assertUnknownProperties)

To keep Manikin models reliable, any property that is not defined in the original schema cannot be
set or retrieved. Attempting to do so will result in an error.

### [Prop Types](plugins/propTypes.md)

Manikin supports using PropTypes to enforce value types within the model, and to enforce the use of specific models.
