document.addEventListener("DOMContentLoaded", () => {
	const author = document.getElementById("author");
	const quoteTags = document.getElementById("quote-tags");
	const quote = document.getElementById("quote");
	const randomQuoteBtn = document.getElementById("random-btn");
	const copyBtn = document.getElementById("copy-btn");
	const copiedText = document.getElementById("copied-text");

	async function copyTextToClipboard(textToCopy) {
		try {
			if (navigator?.clipboard?.writeText) {
				await navigator.clipboard.writeText(textToCopy);
				copiedText.classList.add("active");
				setTimeout(() => {
					copiedText.classList.remove("active");
				}, 2000);
				return;
			}

			// Fallback for older browsers
			const textArea = document.createElement("textarea");
			textArea.value = textToCopy;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			textArea.remove();
			copiedText.classList.add("active");
			setTimeout(() => {
				copiedText.classList.remove("active");
			}, 2000);
		} catch (err) {
			console.error(err);
		}
	}

	async function getRandomQuote() {
		try {
			const response = await fetch("https://api.quotable.io/random");
			const data = await response.json();
			author.innerText = await data.author;
			quoteTags.innerHTML = "";
			const tags = await data.tags;
			tags.forEach((tag) => {
				let spanTag = document.createElement("span");
				spanTag.classList.add("quote-info__tag");
				spanTag.innerText = `${tag}`;
				quoteTags.appendChild(spanTag);
			});
			quote.innerText = `"${data.content}"`;
		} catch (error) {
			console.error(error);
		}
	}

	getRandomQuote();

	randomQuoteBtn.addEventListener("click", getRandomQuote);
	copyBtn.addEventListener("click", () => {
		copyTextToClipboard(quote.innerText);
	});
});
