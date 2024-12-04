function getFilteredPostsByTag(posts, tag) {
    return posts.filter((post) => post.data.tags.includes(tag))
}

function addSlug(posts){
    return posts.map((post) => {
        post.slug = post.data.title.toLowerCase().replace(/ /g, "-")
    })
}

function sortByDate(posts){
    posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
}

export { getFilteredPostsByTag, addSlug, sortByDate }