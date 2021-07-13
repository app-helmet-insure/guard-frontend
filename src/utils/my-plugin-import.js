const toLine = name => {
  const str = name.replace(/([A-Z])/g, '-$1').toLowerCase()
  return str.split('-')[0] ? str : str.slice(1)
}

module.exports = function ({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path, source) {
        const { opts: { libraryName, alias } } = source
        if (!t.isStringLiteral(path.node.source, { value: libraryName })) {
          return
        }
        const newImports = path.node.specifiers.map(item => {
          const str = toLine(item.local.name)

          return t.importDeclaration(
            [t.importDefaultSpecifier(item.local)],
            t.stringLiteral(`${alias}/${str}`)
          )
        })

        path.replaceWithMultiple(newImports)
      }
    }
  }
}
