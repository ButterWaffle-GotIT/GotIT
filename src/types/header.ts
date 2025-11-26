export type NavItem = {
	label: string;
	href: string;
};

export type HeaderProps = {
	isLoggedIn?: boolean;
	showNav?: boolean;
	navItems?: NavItem[];
};
