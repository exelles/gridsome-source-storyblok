const { SCHEMA_NAMES } = require('./constants')

/**
 * @method createSchema
 * @param  {Object} store    Gridsome Data Store API
 * @param  {String} typeName typeName from plugin option
 */
const createSchema = (store, config = {}) => {
  const typeName = config.typeName || SCHEMA_NAMES.STORY
  const tagTypeName = config.tagTypeName || SCHEMA_NAMES.TAG
  const contentTypeName = config.contentTypeName || SCHEMA_NAMES.CONTENT

  store.addSchemaTypes(`
    type AlternateStory {
      id: ID!
      name: String!
      slug: String!
      published: Boolean
      full_slug: String!
      is_folder: Boolean
      parent_id: Int
    }
  `)

  store.addSchemaTypes(`
    type ${tagTypeName} implements Node {
      id: ID!
      name: String!
      taggings_count: Int!
    }
  `)

  store.addSchemaTypes(`
    type ${contentTypeName} {
      _uid: ID!
      title: String!
      excerpt: String!
      link_source: JSON
      image: JSON
      content: JSON
      component: String!
      tag: [String]
    }
  `)

  store.addSchemaTypes(`
    type ${typeName} implements Node {
      content: ${contentTypeName}
      name: String!
      created_at: Date
      published_at: Date
      id: ID!
      slug: String!
      full_slug: String!
      uuid: String!
      real_path: String
      lang: String
      position: Int
      is_startpage: Boolean
      parent_id: Int
      group_id: String
      first_published_at: Date
      release_id: Int
      tag_list: [${tagTypeName}!]!
      meta_data: JSONObject
      sort_by_date: Date
      alternates: [AlternateStory!]!
    }
  `)
}

module.exports = createSchema
