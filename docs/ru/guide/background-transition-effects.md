# Эффекты переходов фонов

При изменении внешности фона с помощью команды [`@back`](/ru/api/#back) можно дополнительно указать, какой эффект перехода следует использовать. Например, следующая команда будет переходить к фону "River" с помощью эффекта перехода "DropFade":

```
@back River.DropFade
```

Если эффект перехода не задан, то по умолчанию используется кроссфейд.

Вы также можете указать продолжительность перехода (в секундах) с помощью параметра `time`:

```
@back River.DropFade time:1.5
```

Приведенное выше выражение вызовет переход к фону "River" с помощью перехода "DropFade" за 1,5 секунды. По умолчанию `time` для всех переходов составляет 0,35 секунды.

Если вы хотите перейти к следующей команде сразу после объявления перехода (а не ждать окончания перехода), вы можете установить параметр `wait` в значение `false`. Напр.:

```
@back River.Ripple time:1.5 wait:false
@bgm PianoTheme
```
– Фоновая музыка "PianoTheme" начнет играть сразу же и не будет задержана на 1,5 секунды процесса перехода.

Некоторые эффекты перехода также поддерживают дополнительные параметры, которыми можно управлять с помощью параметра `params`:

```
@back River.Ripple params:10,5,0.02
``` 
— установит частоту эффекта пульсации на 10, скорость на 5 и амплитуду на 0,02. Если параметр `params` не указан, будут использоваться значения по умолчанию.

Если вы хотите изменить отдельные параметры, вы можете пропустить другие, и они будут иметь свои значения по умолчанию:

```
@back River.Ripple params:,,0.02
``` 

Все параметры перехода имеют десятичный тип. Доступные эффекты перехода с их параметрами и значениями по умолчанию можно найти в приведенной ниже документации.

## BandedSwirl

### Демонстрация

<video class="video" loop autoplay><source src=" https://i.gyazo.com/37432ac584ef04d94d3e4f9535fdffc4.mp4" type="video/mp4"></video>

### Параметры
Имя |  По умолчанию 
--- | --- 
Количество скруток | 5
Частота | 10

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.BandedSwirl

; Применить переход со стандартным количеством скруток, но низкой частотой 
@back Appearance.BandedSwirl params:,2.5
```

## Blinds

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/73a259f2a513a92ef893ebd6a25e9013.mp4" type="video/mp4"></video>

### Параметры
Имя |  По умолчанию 
--- | --- 
Количество | 6

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.Blinds

; Применить переход, используя 30 полос вместо стандартных 6
@back Appearance.Blinds params:30
```

## CircleReveal

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/4f914c6741a5e48a22cafe2ab242a426.mp4" type="video/mp4"></video>

### Параметры
Имя |  По умолчанию 
--- | --- 
Уровень размытия | 0.25

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.CircleReveal

; Применить переход с высоким уровнем размытия
@back Appearance.CircleReveal params:3.33
```

## CircleStretch

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/f09bb69a3c045eeb1f6c8ec0b9dcd790.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.CircleStretch
```

## CloudReveal

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/618ec451a9e10f70486db0bb4badbb71.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.CloudReveal
```

## Crossfade

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/dc4781a577ec891065af1858f5fe2ed1.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.Crossfade
```

## Crumble

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/e27c8477842a2092728ea0cc1ae76bda.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.Crumble
```

## Disolve *(Опечатка – dissolve?)*

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/b2993be8de032a65c7d813c6d749e758.mp4" type="video/mp4"></video>

### Параметры
Имя |  По умолчанию 
--- | --- 
Шаг | 99999

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.Disolve

; Применить переход c малым шагом?
@back Appearance.Disolve params:100
```

## DropFade

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/3c3840bb311ccb9fe223960f2e46f800.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.DropFade
```

## LineReveal

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/c0e5259cd3d4ed2016ab74a65a7eec63.mp4" type="video/mp4"></video>

### Параметры
Имя |  По умолчанию
--- | --- 
Уровень размытия | 0.25
Уклон по оси X? | 0.5
Уклон по оси Y | 0.5

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.LineReveal

;  Применить переход с вертикальным слайдом?
@back Appearance.LineReveal params:,0,1
```

## Pixelate

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/0ac9339b21303e20c524aaf6b6ca95f4.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.Pixelate
```

## RadialBlur

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/f8269fb68519c57c99643948a027a2a1.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.RadialBlur
```

## RadialWiggle

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/a401b3b93a61276ed68ededa2e75e9ae.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.RadialWiggle
```

## RandomCircleReveal

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/f6e685b13fe2d76733fd43878602eabc.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.RandomCircleReveal
```

## Ripple

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/ff1bd285dc675ca5ac04f7ae4500f1c4.mp4" type="video/mp4"></video>

### Параметры
Имя |  По умолчанию
--- | --- 
Частота | 20
Скорость | 10
Амплитуда | 0.5

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.Ripple

; Применить переход с высокими частотой и амплитудой
@back Appearance.Ripple params:45,,1.1
```

## RotateCrumble

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/8d476f466858e4788e5ad6014d6db314.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.RotateCrumble
```

## Saturate

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/ad6eb77b7065387b9cb9afd77adbc784.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.Saturate
```

## Shrink

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/8c8bf00348df28ab89813c21f8655c07.mp4" type="video/mp4"></video>

### Параметры
Имя |  По умолчанию
--- | --- 
Скорость | 200

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.Shrink

; Применить переход с низкой скоростью
@back Appearance.Shrink params:50
```

## SlideIn

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/800ee6f5fba39ab8d46f5eb09f2126cf.mp4" type="video/mp4"></video>

### Параметры
Имя |  По умолчанию
--- | --- 
Количество слайдов | 1

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.SlideIn
```

## SwirlGrid

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/5a21293d979323a112ffd07f1fffd28d.mp4" type="video/mp4"></video>

### Параметры
Имя |  По умолчанию
--- | --- 
Количество скруток | 15
Количество клеток | 10

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.SwirlGrid

; Применить переход с большим количеством скруток и малым количеством клеток
@back Appearance.SwirlGrid params:30,4
```

## Swirl

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/6ac9a2fe1bb9dfaf6a8292ae5d03960e.mp4" type="video/mp4"></video>

### Параметры
Имя |  По умолчанию
--- | --- 
Количество скруток | 15

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.Swirl

; Применить переход с большим количеством скруток
@back Appearance.Swirl params:25
```

## Water

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/7c684f9a122006f38a0be2725895b76f.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.Water
```

## Waterfall

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/b6eebcb68002064ababe4d7476139a7c.mp4" type="video/mp4"></video>

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.Waterfall
```

## Wave

### Демонстрация

<video class="video" loop autoplay><source src="https://i.gyazo.com/e189ca12868d7ae4c9d8f0ca3d9dd298.mp4" type="video/mp4"></video>

### Параметры
Имя |  По умолчанию
--- | --- 
Интенсивность? | 0.1
Фаза? | 14
Частота | 20

### Примеры
```
; Применить переход со стандартными параметрами
@back Appearance.Wave

; Применить переход с высокой интенсивностью и низкой частотой
@back Appearance.Wave params:0.75,,5
```

## Пользовательские Эффекты Перехода

Вы можете создавать пользовательские переходы на основе текстур маски растворения. Маска растворения? – это текстура оттенков серого, где цвет определяет, когда пиксель совершит переход к целевой текстуре. Например, рассмотрим следующую спиральную маску растворения:

![](https://i.gyazo.com/3c32e920efdf6cfb35214b6c9b617a6a.png)

- Черный квадрат в правом верхнем углу указывает на то, что целевая текстура перехода должна быть отображена там в самом начале перехода, а чистый белый квадрат в центре будет совершать переход в самом конце.

Чтобы создать пользовательский переход, используйте режим перехода `Custom` и укажите путь (относительно папки "Resources" проекта) к текстуре маски растворения с помощью параметра `dissolve`, например:

```
@back Appearance.Custom dissolve:Textures/Spiral
```

Посмотрите следующее видео для примеров использования:

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/HZjey6M2-PE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

