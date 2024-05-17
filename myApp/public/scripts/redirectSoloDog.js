
            document.getElementById('searchForm').addEventListener('submit', function (event) {
                const searchTerm = document.getElementById('searchInput').value;
                if (!searchTerm) {
                    event.preventDefault();
                    return;
                }
                this.action = `solodog?nome=${searchTerm}`;
            });
        