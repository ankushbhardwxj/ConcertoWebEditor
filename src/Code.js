export var codeCTO = `
import concerto.metamodel.DecoratorLiteral from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.DecoratorString from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.DecoratorNumber from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.DecoratorBoolean from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.TypeIdentifier from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.DecoratorIdentifier from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.Decorator from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.ClassDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.AssetDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.ParticipantDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.TransactionDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.EventDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.ConceptDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.EnumDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.StringDefault from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.BooleanDefault from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.IntegerDefault from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.RealDefault from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.FieldDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.ObjectFieldDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.BooleanFieldDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.DateTimeFieldDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.StringFieldDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.StringRegexValidator from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.RealDomainValidator from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.IntegerDomainValidator from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.RealFieldDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.IntegerFieldDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.RelationshipDeclaration from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.Import from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.NamespaceImport from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.TypeImport from https://models.accordproject.org/concerto/metamodel.cto
import concerto.metamodel.ModelFile from https://models.accordproject.org/concerto/metamodel.cto

namespace concerto.metamodel



abstract concept DecoratorLiteral {
}

concept DecoratorString extends DecoratorLiteral {
  o String value  
}

concept DecoratorNumber extends DecoratorLiteral {
  o Double value
}

concept DecoratorBoolean extends DecoratorLiteral {
  o Boolean value
}

concept TypeIdentifier {
  o String fullyQualifiedName
}

concept DecoratorIdentifier extends DecoratorLiteral {
  o TypeIdentifier identifier
  o Boolean isArray default=false
}

concept Decorator {
  o String name
  o DecoratorLiteral[] arguments optional
}

abstract concept ClassDeclaration {
  o Decorator[] decorators optional
  o Boolean isAbstract default=false
  o String identifier
  o String identifiedByField optional
  o TypeIdentifier superType optional
}

concept AssetDeclaration extends ClassDeclaration {
}

concept ParticipantDeclaration extends ClassDeclaration {
}

concept TransactionDeclaration extends ClassDeclaration {
}

concept EventDeclaration extends ClassDeclaration {
}

concept ConceptDeclaration extends ClassDeclaration {
}

// TODO - enums do not support abstract or super types
concept EnumDeclaration extends ClassDeclaration {
}

concept StringDefault {
  o String value
}

concept BooleanDefault {
  o Boolean value
}

concept IntegerDefault {
  o Integer value
}

concept RealDefault {
  o Double value
}

abstract concept FieldDeclaration {
  o String name
  o Boolean isArray optional
  o Boolean isOptional optional 
  o Decorator[] decorators optional
}

concept ObjectFieldDeclaration extends FieldDeclaration {
  o StringDefault defaultValue optional
  o TypeIdentifier type
}

concept BooleanFieldDeclaration extends FieldDeclaration {
  o BooleanDefault defaultValue optional
}

concept DateTimeFieldDeclaration extends FieldDeclaration {
}

concept StringFieldDeclaration extends FieldDeclaration {
  o StringDefault defaultValue optional
  o StringRegexValidator validator optional
}

concept StringRegexValidator {
  o String regex
}

concept RealDomainValidator {
  o Double lower optional
  o Double upper optional
}

concept IntegerDomainValidator {
  o Integer lower optional
  o Integer upper optional
}

concept RealFieldDeclaration extends FieldDeclaration {
  o RealDefault defaultValue optional
  o RealDomainValidator validator optional
}

concept IntegerFieldDeclaration extends FieldDeclaration {
  o IntegerDefault defaultValue optional
  o IntegerDomainValidator validator optional
}

concept RelationshipDeclaration extends FieldDeclaration {
  o TypeIdentifier type
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