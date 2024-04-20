# Guess English

Guess English es una pequeña aplicación web creada para aquellos hablantes nativos del español que quieran mejorar sus habilidades en inglés y, porque no, divertirse en el proceso.

## Stack

- NextJS | Framework principal
- TailwindCSS | Styling
- Zustand | Manejo de estado

## Modos de juego
Como principales modos de juego para una primera version estable de GE se encuentran:
- `Wordle`
- `Guess the Verb`
- `The alphabet game`
- `Complete the phrase`

### ¿Cómo jugar a Wordle?

---
El objetivo del juego es simple, adivinar la palabra oculta. La palabra tiene 5 letras y tienes 6 intentos para adivinarla.

Cada intento debe ser una palabra válida. En cada ronda el juego pinta cada letra de un color indicando si esa letra se encuentra o no en la palabra y si se encuentra en la posición correcta.
- VERDE significa que la letra está en la palabra y en la posición CORRECTA.
- AMARILLO significa que la letra está presente en la palabra pero en la posición INCORRECTA.
- GRIS OSCURO significa que la letra NO está presente en la palabra.

#### Letras repetidas
La palabra oculta puede tener letras repetidas. En ese caso, las pistas son independientes para cada letra y tienen prioridad (verde es mayor a amarillo).

### ¿Cómo jugar a Guess the verb?

--- 
Guess the verb es un juego simple donde aparece en pantalla un texto que pregunta el significado o traducción de un verbo del inglés y nosotros debemos elegir la opción correcta entre cuatro posibles respuestas.

El juego cuenta con un sistema de puntos y rachas que irán aumentando o disminuyendo cuando aciertes o falles respectivamente.
Cada acierto te sumará 5 puntos y perder te quitará 5. Si ganas tu racha aumenta de 1 en 1 y si pierdes vuelve a 0.

Entre las opciones y los puntos tendrás un pequeño cartel que te va indicando cuantos verbos que faltan adivinar.

### ¿Cómo jugar a The alphabet game?
The alphabet game funciona igual que el clasico juego de PasaPalabra donde empezamos desde la letra A hasta la Z pasando por cada letra del abecedario inglés teniendo en cuenta que estaremos a contrarreloj.
En cada letra se nos presentará una pequeña descripción de la palabra que debemos adivinar (Que empieza con la letra en la que estamos), esta palabra es cualquiera del alfabeto inglés y de longitud variada.

#### Ejemplo:

Imaginemos que estamos en la letra H y se nos presenta la siguiente definición:

***The line where the earth or sea meets the sky, visible from any location and representing the limit of one's view.***

Si nosotros escribimos una palabra errónea entonces la letra H quedará marcada en rojo como FALLADA, por lo que cuando el jugador vuelva a dar una segunda vuelva por el abecedario ya no podrá adivinar la letra H, en otras palabras hay solo una oportunidad por letra.

También el jugador tendrá la opción de pasar a la siguiente letra si es que no sabe la definición para ahorrar tiempo, en este caso la letra quedará en un estado de PENDIENTE lo que quiere decir que tenemos la oportunidad de adivinar la letra cuando demos la vuelva por el abecedario.

#### ¿Qué pasa cuando se llega a la Z?
Cuando el jugador llega a la Z y ha adivinado todas las palabras sin que se le acabe el tiempo entonces habrá ganado el juego.
En otro caso y si le sobra tiempo debera volver a adivinar las palabras que dejó en pendiente.