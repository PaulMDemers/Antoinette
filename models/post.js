'use strict';

class Post {
    constructor(id, title, featuredimg, content, tags, postdate) {
        this.id = id;
        this.title = title;
        this.featuredimg = featuredimg;
        this.content = content;
        this.tags = tags;
        this.postdate = postdate;
    }

    static async get(pool, id) {
        let [res] = await pool.execute("SELECT * FROM Posts WHERE ID=?", [id]);

        return res.length > 0 ? new Post(res[0].ID, res[0].Title, res[0].FeaturedImg, res[0].Content, res[0].Tags ? res[0].Tags.split(',') : [], res[0].PostDate) : null;
    }

    static async getPaginated(pool, page, tag = null) {
        let query = null;
        let params = [];

        if(tag) {
            query = 'SELECT Posts.*, GROUP_CONCAT(PostTags.Tag) as "Tags" FROM Posts JOIN PostTags ON Posts.ID=PostTags.PostID WHERE ID IN (SELECT PostTags.PostID FROM PostTags WHERE Tag=?) GROUP BY Posts.ID ORDER BY ID DESC LIMIT ?, ?';
            params = [tag, page * 10, 10];
        } else {
            query = "SELECT Posts.*, GROUP_CONCAT(PostTags.Tag) as 'Tags' FROM Posts LEFT JOIN PostTags ON Posts.ID=PostTags.PostID GROUP BY Posts.ID ORDER BY ID DESC LIMIT ?,?";
            params = [page * 10, 10];
        }

        let [res] = await pool.query(query, params);

        return res.map((item) => {
            console.log(item);
            return new Post(item.ID, item.Title, item.FeaturedImg, item.Content, item.Tags ? item.Tags.split(',') : [], item.PostDate);
        });
    }

    static async getTotals(pool, tag = null) {
        let query = null;
        let params = [];

        if(tag) {
            query = 'SELECT COUNT(*) AS NumberOfPosts FROM Posts WHERE ID IN (SELECT PostTags.PostID FROM PostTags WHERE Tag=?)';
            params = [tag];
        } else {
            query = "SELECT COUNT(*) AS NumberOfPosts FROM Posts";
            params = [];
        }

        let [res] = await pool.query(query, params);

        return res[0].NumberOfPosts;
    }

    static async create(pool, post) {
        let [postRes] = await pool.execute('INSERT INTO Posts (Title, FeaturedImg, Content, PostDate) VALUES (?,?,?, NOW())', 
        [
            post.title ? post.title : null, 
            post.featuredImg ? post.featuredImg : null, 
            post.content ? post.content : null]);

        if(post.tags) {
            for(let a = 0; a < post.tags.length; a++) {
                let [tagRes] = await pool.execute('INSERT INTO PostTags (PostID, Tag) VALUES (?,?)', [postRes.insertId, post.tags[a]]);
            }
        }

        return await Post.get(pool, postRes.insertId);
    }

    static async update(pool, post) {
        let [postRes] = await pool.execute('UPDATE Posts SET Title=?, FeaturedImg=?, Content=? WHERE ID=?', 
        [
            post.title ? post.title : null, 
            post.featuredImg ? post.featuredImg : null, 
            post.content ? post.content : null,
        post.id]);

        if(post.tags) {
            let [delRes] = await pool.execute("DELETE FROM PostTags WHERE PostID=?", [post.id]);
            for(let a = 0; a < post.tags.length; a++) {
                let [tagRes] = await pool.execute('INSERT INTO PostTags (PostID, Tag) VALUES (?,?)', [postRes.insertId, post.tags[a]]);
            }
        }

        return await Post.get(pool, post.id);
    }

    static async delete(pool, postId) {
        let [res] = await pool.execute("DELETE FROM Posts WHERE ID=?", [postId]);
    }
}

module.exports = Post;


/*
        this.id = id;
        this.title = title;
        this.featuredimg = featuredimg;
        this.content = content;
        this.tags = tags;
        this.postdate = postdate;


*/