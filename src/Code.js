export var codeCTO = `
namespace concerto.metamodel



abstract concept DecoratorLiteral {
}

concept DecoratorString identified by DecoratorLiteral {
  o String value  
}

concept DecoratorNumber extends DecoratorLiteral {
  o Double value
}

concept DecoratorBoolean extends DecoratorLiteral {
  o Boolean value
}

`