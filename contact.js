const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

if (form && statusText) {
	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		const submitButton = form.querySelector('button[type="submit"]');
		const formData = new FormData(form);

		statusText.textContent = "Sending...";
		if (submitButton) {
			submitButton.disabled = true;
		}

		try {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					Accept: "application/json"
				},
				body: formData
			});

			const result = await response.json();

			if (response.ok && result.success) {
				form.reset();
				statusText.textContent = "Message sent. I’ll reply as soon as I can.";
			} else {
				statusText.textContent = result.message || "Something went wrong. Please try again.";
			}
		} catch (error) {
			statusText.textContent = "Something went wrong. Please email me directly.";
		} finally {
			if (submitButton) {
				submitButton.disabled = false;
			}
		}
	});
}
