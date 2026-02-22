import https from 'node:https';

https.get('https://reflectorsreflections.substack.com/p/reflection-of-the-week-a-ring-of', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            // Look for window._preloads = JSON.parse("...");
            const match = data.match(/window\._preloads\s*=\s*JSON\.parse\("((?:[^"\\]|\\.)*)"\)/);
            if (match && match[1]) {
                // Unescape the JSON string
                const jsonStr = match[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t');
                const preloads = JSON.parse(jsonStr);
                // Find the post object within preloads. Usually it's deep inside
                console.log("Keys in preloads:", Object.keys(preloads));
                if (preloads.post) {
                    console.log("Has post!");
                    console.log("body_html length:", preloads.post.body_html?.length);
                    console.log("podcastUpload:", !!preloads.post.podcastUpload);
                    console.log("videoUpload:", !!preloads.post.videoUpload);
                } else {
                    console.log("preloads.post is undefined, let's search for it");
                    // The structure is often preloads.pub.post or preloads.graphql or something.
                    // Let's just output keys of preloads to see where post is.
                    console.log(JSON.stringify(Object.keys(preloads), null, 2));
                    if (preloads.pub) console.log(Object.keys(preloads.pub));
                }
            } else {
                console.log("No _preloads found.");
            }
        } catch (e) {
            console.error(e);
        }
    });
}).on('error', (e) => console.error(e));
