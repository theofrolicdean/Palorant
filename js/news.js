document.addEventListener("DOMContentLoaded", function() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const newsCards = document.querySelectorAll(".news-card");
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                
                const filterValue = button.getAttribute("data-filter");
                
                newsCards.forEach(card => {
                    if (filterValue === "all") {
                        card.style.display = "block";
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, 100);
                    } else if (card.getAttribute("data-category") === filterValue) {
                        card.style.display = "block";
                        // Add animation effect
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, 100);
                    } else {
                        card.style.opacity = "0";
                        card.style.transform = "translateY(20px)";
                        setTimeout(() => {
                            card.style.display = "none";
                        }, 300);
                    }
                });
            });
        });
    }

    const newsContentParagraphs = document.querySelectorAll(".news-card .news-content p:not(.news-date)");
    newsContentParagraphs.forEach(p => {
        p.classList.add("news-preview");
    });

    const popupOverlay = document.createElement("div");
    popupOverlay.className = "news-popup-overlay";
    popupOverlay.innerHTML = `
        <div class="news-popup">
            <button class="news-popup-close">&times;</button>
            <div class="news-popup-image">
                <img src="" alt="News image">
            </div>
            <div class="news-popup-content">
                <div class="news-popup-tag"></div>
                <h2 class="news-popup-title"></h2>
                <p class="news-popup-date"></p>
                <div class="news-popup-body"></div>
            </div>
        </div>
    `;
    document.body.appendChild(popupOverlay);

    const readMoreLinks = document.querySelectorAll(".read-more, .btn-read-more");
    const popup = document.querySelector(".news-popup");
    const closeBtn = document.querySelector(".news-popup-close");

    readMoreLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            const articleElement = this.closest(".news-card") || this.closest(".featured-article");
            const image = articleElement.querySelector("img").src;
            const tag = articleElement.querySelector(".news-tag").textContent;
            const title = articleElement.querySelector("h3").textContent;
            const date = articleElement.querySelector(".news-date").textContent;
            let previewText = "";
            if (articleElement.querySelector("p:not(.news-date)")) 
                previewText = articleElement.querySelector("p:not(.news-date)").textContent;

            
            const fullContent = generateFullArticleContent(previewText, title);

            popup.querySelector(".news-popup-image img").src = image;
            popup.querySelector(".news-popup-tag").textContent = tag;
            popup.querySelector(".news-popup-title").textContent = title;
            popup.querySelector(".news-popup-date").textContent = date;
            popup.querySelector(".news-popup-body").innerHTML = fullContent;
            popupOverlay.classList.add("active");
            document.body.classList.add("popup-open");
        });
    });

    closeBtn.addEventListener("click", closePopup);
    popupOverlay.addEventListener("click", function(e) {
        if (e.target === popupOverlay) closePopup();
    });

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && popupOverlay.classList.contains("active")) closePopup();
    });

    function closePopup() {
        popupOverlay.classList.remove("active");
        document.body.classList.remove("popup-open");
    }

    function generateFullArticleContent(previewText, title) {
        const titleWords = title.split(" ");
        const keyword = titleWords[titleWords.length - 1].toLowerCase().replace(/[^a-z]/g, "");
        
        let paragraphs = [
            previewText,
            `The ${keyword} feature has been highly anticipated by our community for months. Our development team has worked tirelessly to ensure it meets the high standards our players expect from Palorant.`,
            `"We"re excited to finally share this with our players," said Game Director Sarah Chen. "The community feedback during testing was invaluable in refining the experience."`,
            `Players can expect this update to roll out gradually across all regions over the next week. Make sure your game client is updated to the latest version to experience all the new features.`,
            `Additionally, we"ll be hosting a special event to celebrate this release, with exclusive in-game rewards for participants. Stay tuned to our social media channels for more details on how to join.`
        ];
        
        return paragraphs.map(p => `<p>${p}</p>`).join("");
    }

    const loadMoreBtn = document.getElementById("load-more");
    let currentItems = 6; 
    const increment = 3; 
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", function() {
            loadMoreBtn.innerHTML = '<span class="loading-spinner"></span> Loading...';
            
            setTimeout(() => {
                const moreArticles = [
                    {
                        image: "../assets/news/tournament.jpg",
                        tag: "Tournament",
                        title: "Collegiate Palorant Tournament Announces $50,000 Prize Pool",
                        date: "March 5, 2025",
                        excerpt: "Universities across the country will compete in our biggest collegiate tournament yet. Registration opens next week for all eligible student teams.",
                        category: "esports"
                    },
                    {
                        image: "../assets/news/agent-update.png",
                        tag: "Agent Update",
                        title: "Rebalancing Coming to Sentinel Agents in Next Patch",
                        date: "March 1, 2025",
                        excerpt: 'We"re making adjustments to several Sentinel agents to ensure their utility remains balanced against the newer agents. Read the full details here.',
                        category: "updates"
                    },
                    {
                        image: "../assets/news/community-challenge.jpg",
                        tag: "Community",
                        title: "Weekly Community Challenge: Show Off Your Best Clutch Moments",
                        date: "February 25, 2025",
                        excerpt: "Submit your most impressive clutch plays for a chance to be featured on our official channels and win exclusive in-game rewards.",
                        category: "community"
                    }
                ];
                
                const newsArticlesContainer = document.querySelector(".news-articles");
                moreArticles.forEach(article => {
                    const newArticle = document.createElement("article");
                    newArticle.className = "news-card";
                    newArticle.setAttribute("data-category", article.category);
                    
                    newArticle.innerHTML = `
                        <div class="news-image">
                            <img src="${article.image}" alt="${article.title}">
                        </div>
                        <div class="news-content">
                            <div class="news-tag">${article.tag}</div>
                            <h3>${article.title}</h3>
                            <p class="news-date">${article.date}</p>
                            <p class="news-preview">${article.excerpt}</p>
                            <a href="#" class="read-more">Read More</a>
                        </div>
                    `;
                    
                    newArticle.style.opacity = "0";
                    newArticle.style.transform = "translateY(20px)";
                    newsArticlesContainer.appendChild(newArticle);
                    
                    // Add read more functionality to new cards
                    const newReadMoreLink = newArticle.querySelector(".read-more");
                    newReadMoreLink.addEventListener("click", function(e) {
                        e.preventDefault();
                        
                        // Get parent article
                        const articleElement = this.closest(".news-card");
                        
                        // Get article data
                        const image = articleElement.querySelector("img").src;
                        const tag = articleElement.querySelector(".news-tag").textContent;
                        const title = articleElement.querySelector("h3").textContent;
                        const date = articleElement.querySelector(".news-date").textContent;
                        const previewText = articleElement.querySelector("p.news-preview").textContent;
                        
                        // Generate full article content
                        const fullContent = generateFullArticleContent(previewText, title);
                        
                        // Fill popup with data
                        popup.querySelector(".news-popup-image img").src = image;
                        popup.querySelector(".news-popup-tag").textContent = tag;
                        popup.querySelector(".news-popup-title").textContent = title;
                        popup.querySelector(".news-popup-date").textContent = date;
                        popup.querySelector(".news-popup-body").innerHTML = fullContent;
                        
                        // Show popup
                        popupOverlay.classList.add("active");
                        document.body.classList.add("popup-open");
                    });
                    
                    setTimeout(() => {
                        newArticle.style.opacity = "1";
                        newArticle.style.transform = "translateY(0)";
                    }, 100);
                });
                
                currentItems += increment;
                
                if (currentItems >= 9) loadMoreBtn.style.display = "none"; 
                else loadMoreBtn.innerHTML = "Load More News";
            }, 1500);
        });
    }

    // Newsletter form Validation
    const newsletterForm = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("email");
    const newsletterMessage = document.getElementById("newsletter-message");
    
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                newsletterMessage.textContent = "Please enter a valid email address.";
                newsletterMessage.style.color = "#ff4655";
                return;
            }
            
            newsletterMessage.textContent = "Submitting...";
            newsletterMessage.style.color = "#ffffff";
            
            setTimeout(() => {
                newsletterMessage.textContent = "Thank you for subscribing! Check your email for confirmation.";
                newsletterMessage.style.color = "#4CAF50";
                newsletterMessage.style.lineHeight = 1.5;
                emailInput.value = "";
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const images = document.querySelectorAll(".news-image img");    
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute("data-src");
                    if (src) {
                        img.src = src;
                        img.removeAttribute("data-src");
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (!img.closest(".news-popup")) { 
                const src = img.src;
                img.src = "../assets/placeholder.png"; 
                img.setAttribute("data-src", src);
                imageObserver.observe(img);
            }
        });
    }
});