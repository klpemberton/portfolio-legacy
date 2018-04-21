<?php
$pgTitle="Contact Kristine Pemberton: Web Designer. San Luis Obispo, CA Website Development";
$pgDesc="I will create for you a totally unique, modern website, unlike my competition who give you pre-made themes or outdated design. So what are you waiting for?";
$pgSlug="contact";
include('header.php'); 
?>

		<main id="main-container" class="main-container">

			<h1 class="headline"><span>Contact</span></h1>

			<article class="container">

				<section class="one-half">
					<p id="contact-intro">Contact me using the form below.</p>

					<form id="contact-form" action="processForm.php" method="post">
						<div class="form-field">
							<label for="name">Name:</label>
							<input type="text" id="name" name="name" class="required" />
							<p class="helper"></p>
						</div>
						<div class="form-field">
							<label for="email">Email:</label>
							<input type="email" id="email" name="email" class="required" />
							<p class="helper"></p>
						</div>
						<div class="form-field">
							<label for="message">Message:</label>
							<textarea type="text" id="message" name="message" class="required"></textarea>
							<p class="helper"></p>
						</div>
						<div><button type="submit" id="send" class="button">Send!</button></div>
					</form>
				</section>

				<aside class="aside one-half">
					<div class="aside-content">
						<h3>Let's Get Started</h3>
						<p>So, now that you know I can provide you a totally unique, solidly coded website, what are you waiting for? You want a website, and I want to develop it for you. Contact me ASAP and let's get to work!</p>
					</div>
				</aside>

			</article>
	
<?php include('footer.php'); ?>