export var codeCTO = `
namespace concerto.metamodel

abstract concept DecoratorLiteral {
}

concept DecoratorString identified by DecoratorLiteral {
  o String value
}

concept DecoratorName extends DecoratorLiteral {
  o String value1
  o String value2
}

enum Cardsuit{
  o CLUBS
  o DIAMONDS
  o HEARTS
  o SPADES
}

transaction Ankush {
  o String Name
}

asset Ankush {
  o String class
  o String Name
}

participant Ankush extends Decorator {
  o String class
}

concept NewJudge {
  o String class
}
`