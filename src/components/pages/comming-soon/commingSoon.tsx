import Section from "@/components/pages/landing/shared/section";
import { Button, Typography } from "@/components/ui";
import Icon from "@/Icons";
import Image from "next/image";

const waitlist = [
	"/assets/comming-soon/user-1.png",
	"/assets/comming-soon/user-2.png",
	"/assets/comming-soon/user-3.png",
	"/assets/comming-soon/user-4.png",
	"/assets/comming-soon/user-5.png",
];

const styles = {
	section: "!pb-0 !pt-8 h-screen overflow-hidden flex flex-col",
	logo: "h-6 lg:h-8 mr-auto",
	header: "flex justify-between",
	comingSoonContainer:
		"relative aspect-[283/63] w-[150px] md:w-[200px] lg:w-[283px] md:mt-2 lg:-mr-20",
	content: "flex-1 flex gap-10",
	contentLeft:
		"max-lg:mx-auto max-lg:items-center max-lg:text-center h-full flex flex-col justify-center gap-6 md:max-w-[550px] overflow-x-hidden",
	badge:
		"text-heading flex items-center gap-2 bg-[#E5F2FB] w-fit py-1.5 px-3 rounded-full",
	badgeIcon: "h-4",
	title: "text-heading text-4xl font-medium",
	titleHighlight:
		"font-bold [background-image:var(--gradient-button)] bg-clip-text text-transparent",
	description: "text-sm text-paragraph",
	emailInputContainer:
		"max-md:max-w-full md:w-[420px] h-12 py-1 px-2 flex items-center bg-[#EEEDEDFC] rounded-full border border-[#D9D9D9]",
	emailInput:
		"h-full flex-1 min-w-0 bg-transparent focus:outline-none px-4 text-paragraph",
	joinButton: "rounded-full h-full w-[120px]",
	joinButtonIcon: "h-4 stroke-white -rotate-90 ml-1",
	waitlistContainer: "w-fit flex items-center justify-center flex-wrap gap-5",
	waitlistText: "text-sm text-paragraph",
	waitlistImages: "flex items-center",
	waitlistImage: "-ml-2 bg-gray-100 rounded-full",
	deviceContainer:
		"ml-auto relative aspect-[491/550] max-lg:hidden lg:w-[400px] xl:w-[491px]",
	deviceImage: "my-auto ml-auto",
	footer: "flex items-center justify-center p-4",
	footerText: "text-heading",
};

const CommingSoon = () => {
	return (
		<Section
			className={styles.section}
			style={{
				backgroundImage: "url('/assets/landing/landing-hero-bg.png')",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className={styles.header}>
				{/* Logo */}
				<Icon name="logoWithGreenText" className={styles.logo} />

				{/* Comming Soon */}
				<div className={styles.comingSoonContainer}>
					<Image
						src={"/assets/comming-soon/comming-soon-text.svg"}
						alt="Comming Soon Text"
						fill
						priority
					/>
				</div>
			</div>

			{/* Content */}
			<div className={styles.content}>
				<div className={styles.contentLeft}>
					<Typography level="p1" className={styles.badge}>
						CityPerks 2025 Release – Cutting-edge approach
						<Icon name="rightArrow" className={styles.badgeIcon} />
					</Typography>

					<Typography level="custom" className={styles.title}>
						Join <span className={styles.titleHighlight}>CityPerks</span>{" "}
						Waitlist
					</Typography>

					<Typography level="custom" className={styles.description}>
						A Platform that empowers cities to drive engagement, support local
						businesses, & connect with residents through rewards & real-time
						communication.
					</Typography>

					<div className={styles.emailInputContainer}>
						<input
							type="text"
							className={styles.emailInput}
							placeholder="Enter your email"
						/>

						<Button size="small" className={styles.joinButton}>
							Join waitlist
							<Icon name="chevronDown" className={styles.joinButtonIcon} />
						</Button>
					</div>

					<div className={styles.waitlistContainer}>
						<Typography level="custom" className={styles.waitlistText}>
							Over 200+ have already joined
						</Typography>

						<div className={styles.waitlistImages}>
							{waitlist?.map?.((image, index) => (
								<Image
									src={image}
									key={`${image}-${index}`}
									alt={`waitlist-item-${index}`}
									className={styles.waitlistImage}
									height={35}
									width={35}
								/>
							))}
						</div>
					</div>
				</div>

				{/* Device */}
				<div className={styles.deviceContainer}>
					<Image
						className={styles.deviceImage}
						src={"/assets/comming-soon/devices.svg"}
						alt="Devices Image"
						fill
						priority
						loading="eager"
						sizes="(min-width: 1280px) 490px, (min-width: 768px) 350px, (min-width: 640px) 300px, 200px"
					/>
				</div>
			</div>

			{/* Footer */}
			<footer className={styles.footer}>
				<Typography level="p1" className={styles.footerText}>
					Copyright 2025©cityperks LLC | All Rights Reserved
				</Typography>
			</footer>
		</Section>
	);
};

export default CommingSoon;
