# Modal Component

Un composant Modal flexible basé sur le Modal de Material-UI.

## Utilisation

```tsx
import { Modal } from '@aexae/design-system';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Ouvrir Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Typography variant="h6">Titre du Modal</Typography>
        <Typography>Contenu du modal...</Typography>
      </Modal>
    </>
  );
}
```

## Props

- `open` (boolean, required): Contrôle l'ouverture/fermeture du modal
- `onClose` (function, required): Fonction appelée lors de la fermeture
- `children` (ReactNode, required): Contenu du modal
- `maxWidth` ("xs" | "sm" | "md" | "lg" | "xl"): Largeur maximale (défaut: "sm")
- `fullWidth` (boolean): Si true, le modal prend 90% de la largeur (défaut: false)
- `disablePadding` (boolean): Désactive le padding interne (défaut: false)

## Exemples

### Modal simple

```tsx
<Modal open={open} onClose={handleClose}>
  <Typography>Contenu simple</Typography>
</Modal>
```

### Modal avec largeur personnalisée

```tsx
<Modal open={open} onClose={handleClose} maxWidth="lg" fullWidth>
  <Typography>Modal large</Typography>
</Modal>
```

### Modal sans padding

```tsx
<Modal open={open} onClose={handleClose} disablePadding>
  <img src="image.jpg" alt="Full width image" />
</Modal>
```
