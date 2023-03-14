import * as React from 'react'

const Nav = (props: {
    brand: { name: string; to: string };
    links:  Array<{ name: string; to: string }>
}) => {

    const {brand, links} = props
    const NavLinks: any = () => links.map((link: { name: string, to: string }) => <li key={link.name}><a href={link.to}>{link.name}</a></li>);
    return (
    <div>
        <a href={brand.to}>{brand.name}</a>
        <NavLinks />
    </div>
    )
}

export default Nav