function slugify(title) {
  return title.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

module.exports = (dato, root, i18n) => {

  root.createDataFile('site.yaml', 'yaml', dato.site.toMap());

  // Gather data for single instance types and store as a date file
  root.directory('./data', dir => {
    dato.singleInstanceItemTypes.forEach(itemType => {
      const item = dato.itemsOfType(itemType) ? dato.itemsOfType(itemType)[0] : null;
      if (item) {
        dir.createDataFile(`${itemType.apiKey}.yaml`, 'yaml', item.toMap());
      }
    });
  });

  // Gather data with children and store as pages
  dato.collectionItemTypes.forEach(itemType => {
    if (itemType.apiKey != 'category') {
      root.directory(`./content/${itemType.apiKey}/`, dir => {
        if (dato.itemsOfType(itemType)) {
          dato.itemsOfType(itemType).forEach(item => {
            if (item.title || item.name) {
              dir.createPost(`${slugify(item.title || item.name)}.md`, 'yaml', { frontmatter: item.toMap(), content: item.content });
            }
          });
        }
      });
    }
  });

  root.createPost(`content/deventer.md`, 'yaml', {
    frontmatter: {
      title: dato.deventer.title,
      introduction: dato.deventer.introduction,
      itemType: 'deventer',
      photo: dato.deventer.photo,
      image: dato.deventer.image
    },
    content: dato.deventer.content
  });

  root.createPost(`content/contact.md`, 'yaml', {
    frontmatter: {
      title: dato.contact.title,
      introduction: dato.contact.introduction,
      itemType: 'contact',
      photo: dato.contact.photo,
      image: dato.contact.image
    },
    content: dato.contact.content
  });

  // root.directory('./content', dir => {
  //   dato.singleInstanceItemTypes.forEach(itemType => {
  //     const item = dato.itemsOfType(itemType) ? dato.itemsOfType(itemType)[0] : null;
  //     if (item) {
  //       dir.createPost(`${slugify(item.title)}.md`, 'yaml', { frontmatter: item.toMap(), content: item.content });
  //     }
  //   });
  // });
};