-- ============================================================
-- Datos semilla de BinWise
-- Se cargan automáticamente solo en un arranque limpio del
-- volumen de MySQL (docker compose down -v && up).
-- ============================================================

-- Asegura que las tildes y la ñ se guarden correctamente.
SET NAMES utf8mb4;

-- Categorías de residuos
-- (La clasificación por imagen del backend usa la categoría id = 1)
INSERT INTO WasteCategories (id, name, description, color) VALUES
  (1, 'Plástico',        'Botellas, envases y bolsas plásticas.',            '#FFF59D'),
  (2, 'Papel y cartón',  'Periódicos, cajas, revistas y hojas.',             '#90CAF9'),
  (3, 'Vidrio',          'Botellas y frascos de vidrio.',                    '#A5D6A7'),
  (4, 'Metal',           'Latas de aluminio y envases metálicos.',           '#CFD8DC'),
  (5, 'Orgánico',        'Restos de comida y residuos biodegradables.',      '#C5E1A5'),
  (6, 'Electrónicos',    'Pilas, cables y dispositivos electrónicos.',       '#FFAB91');

-- Recompensas
INSERT INTO Rewards (id, name, description, type, pointsRequired) VALUES
  (1, 'Primer paso',          'Registraste tu primer reciclaje.',           'logro',   10),
  (2, 'Reciclador novato',    'Alcanzaste 50 puntos reciclando.',           'medalla', 50),
  (3, 'Eco guerrero',         'Alcanzaste 200 puntos. ¡Sigue así!',         'medalla', 200),
  (4, 'Maestro del reciclaje','Alcanzaste 500 puntos. ¡Eres un ejemplo!',   'medalla', 500);

-- Módulos educativos
INSERT INTO EducationModules (id, title, description, estimatedMinutes, content) VALUES
  (1, 'Introducción al reciclaje',
      'Conceptos básicos sobre por qué y cómo reciclar.',
      5,
      'El reciclaje es el proceso de convertir residuos en nuevos productos. Reduce la contaminación, ahorra energía y conserva recursos naturales. Empieza separando tus residuos en casa: plástico, papel, vidrio y orgánico.'),
  (2, 'Separación correcta de residuos',
      'Aprende a clasificar cada tipo de residuo en su contenedor.',
      8,
      'Cada material tiene su contenedor: amarillo para plásticos y latas, azul para papel y cartón, verde para vidrio, y marrón para orgánico. Enjuaga los envases antes de reciclarlos y aplasta las botellas para ahorrar espacio.'),
  (3, 'Compostaje en casa',
      'Convierte tus residuos orgánicos en abono natural.',
      10,
      'El compostaje transforma restos de comida y residuos de jardín en abono rico en nutrientes. Necesitas un recipiente, materiales secos (hojas, cartón) y húmedos (restos de fruta y verdura). Remueve la mezcla cada semana y en unos meses tendrás compost listo para tus plantas.');
