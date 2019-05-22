# Auto-Advance Text

Auto-advance feature allows to automatically continue script execution when handling [`i`](/api/#i) commands. 

<video class="video" loop autoplay><source src="https://i.gyazo.com/e6f58f861fa18bd62591db9794e7641b.mp4 " type="video/mp4"></video>

Wait for user input or "i" commands halt script execution until user activates a `Continue` input and are typically used after printing-out a text message. When in auto-advance mode, "i" commands will instead halt script execution for a period of time and then finish, allowing execution of the following command. Halt period depends on the length of the last printed text message and further modified by "Print speed" game setting.

Auto-advance mode can be toggled using `AutoPlay` input (`A` key by default for standalone input module) or "AUTO" button in the control panel.

