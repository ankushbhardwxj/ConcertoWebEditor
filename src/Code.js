export var codeCTO = `
namespace concerto.metamodel
import org.accordproject.address.PostalAddress


abstract concept DecoratorLiteral {
}
@somedecorator
abstract concept ClassDeclaration {
  o Decorator[] decorators optional
  o Boolean isAbstract default=false
  o String identifier
  o String identifiedByField optional
  o TypeIdentifier superType optional
}


abstract concept FieldDeclaration {
  o String name
  o Boolean isArray optional
  o Boolean isOptional optional 
  o Decorator[] decorators optional
}

abstract concept Import {
  o String uri optional
}

concept NamespaceImport extends Import {
  o String namespace
}

concept TypeImport extends Import {
  o TypeIdentifier identifier
}

concept ModelFile {
  o String namespace
  o Import[] imports optional
  o ClassDeclaration[] declarations optional
}
`