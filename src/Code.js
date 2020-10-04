export var codeCTO = `
namespace concerto.metamodel

abstract concept Ankush {

}

concept Sushmita identified by Ankush {
  o String value
}

concept Farzeen extends Ankush {
  o Double value
}

concept Debo extends Ankush {
  o Boolean value
}

`