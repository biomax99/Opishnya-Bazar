export interface NavItem {
  label: string
  to: string
  icon: string
  exact?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Каталог', to: '/', icon: 'pi pi-th-large', exact: true },
  { label: 'Мої оголошення', to: '/my-listings', icon: 'pi pi-list' },
  { label: 'Створити оголошення', to: '/create-listing', icon: 'pi pi-plus-circle' },
  { label: 'Профіль', to: '/profile', icon: 'pi pi-user' },
]
