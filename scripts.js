const quote = document.getElementById("quote");
const author = document.getElementById("author");
const api_url = "https://api.quotable.io/random";

async function getQuote(url) {
    try {
        // Show the quote while loading
        quote.style.opacity = 0;
        author.style.opacity = 0;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        const data = await response.json();
        quote.innerHTML = data.content;

        // Show the quote
        quote.style.opacity = 1;

        // Delay showing the author
        setTimeout(() => {
            author.innerHTML = data.author;
            author.style.opacity = 1;
        }, 500); // Adjust the delay (in milliseconds) as needed
    } catch (error) {
        console.error('Error fetching quote:', error);
        quote.innerHTML = 'Failed to fetch quote';
        author.innerHTML = '';
    }
}



function tweet() {
    const encodedQuote = encodeURIComponent(quote.innerHTML);
    const encodedAuthor = encodeURIComponent(author.innerHTML);
    const tweetText = `${encodedQuote}%0A%0ABy ${encodedAuthor}`;
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "Tweet Window", "width=700, height=400");
}

getQuote(api_url);