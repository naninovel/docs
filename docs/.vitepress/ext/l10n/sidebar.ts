import { DefaultTheme } from "vitepress";

export const en: DefaultTheme.SidebarItem[] = [
    {
        text: "Essential",
        collapsed: true,
        items: [
            { text: "Introduction", link: "/guide/" },
            { text: "Compatibility", link: "/guide/compatibility" },
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Scenario Scripting", link: "/guide/scenario-scripting" },
            { text: "VS Code Extension", link: "/guide/ide-extension" },
            { text: "Story Editor", link: "/guide/editor" },
            { text: "Samples", link: "/guide/samples" }
        ]
    },
    {
        text: "Developer",
        collapsed: true,
        items: [
            { text: "Configuration", link: "/guide/configuration" },
            { text: "Text Printers", link: "/guide/text-printers" },
            { text: "Characters", link: "/guide/characters" },
            { text: "Backgrounds", link: "/guide/backgrounds" },
            { text: "Special Effects", link: "/guide/special-effects" },
            { text: "Audio", link: "/guide/audio" },
            { text: "Voicing", link: "/guide/voicing" },
            { text: "Choices", link: "/guide/choices" },
            { text: "GUI", link: "/guide/gui" },
            { text: "Input Processing", link: "/guide/input-processing" },
            { text: "Unlockable Items", link: "/guide/unlockable-items" },
            { text: "Custom Variables", link: "/guide/custom-variables" },
            { text: "Script Expressions", link: "/guide/script-expressions" },
            { text: "Managed Text", link: "/guide/managed-text" },
            { text: "Localization", link: "/guide/localization" },
            { text: "Memory Management", link: "/guide/memory-management" },
            { text: "Resource Providers", link: "/guide/resource-providers" }
        ]
    },
    {
        text: "Advanced",
        collapsed: true,
        items: [
            { text: "Engine Architecture", link: "/guide/engine-architecture" },
            { text: "Engine Services", link: "/guide/engine-services" },
            { text: "Custom Commands", link: "/guide/custom-commands" },
            { text: "Custom Configurations", link: "/guide/custom-configuration" },
            { text: "Custom Actor Implementations", link: "/guide/custom-actor-implementations" },
            { text: "Custom Actor Shader", link: "/guide/custom-actor-shader" },
            { text: "Custom Script Compiler", link: "/guide/custom-compiler" },
            { text: "State Management", link: "/guide/state-management" },
            { text: "Integration Options", link: "/guide/integration-options" },
            { text: "Automated Testing", link: "/guide/automated-testing" },
            { text: "Custom Build Environment", link: "/guide/custom-build-environment" }
        ]
    }
];

export const ja: DefaultTheme.SidebarItem[] = [
    {
        text: "基本",
        collapsed: true,
        items: [
            { text: "紹介", link: "/ja/guide/" },
            { text: "互換性", link: "/ja/guide/compatibility" },
            { text: "スタートガイド", link: "/ja/guide/getting-started" },
            { text: "シナリオスクリプト", link: "/ja/guide/scenario-scripting" },
            { text: "VS Code 拡張機能", link: "/ja/guide/ide-extension" },
            { text: "ストーリーエディタ", link: "/ja/guide/editor" },
            { text: "サンプル", link: "/ja/guide/samples" }
        ]
    },
    {
        text: "開発者",
        collapsed: true,
        items: [
            { text: "コンフィグレーション", link: "/ja/guide/configuration" },
            { text: "テキストプリンター", link: "/ja/guide/text-printers" },
            { text: "キャラクター", link: "/ja/guide/characters" },
            { text: "背景", link: "/ja/guide/backgrounds" },
            { text: "特殊エフェクト", link: "/ja/guide/special-effects" },
            { text: "オーディオ", link: "/ja/guide/audio" },
            { text: "ボイス", link: "/ja/guide/voicing" },
            { text: "選択肢", link: "/ja/guide/choices" },
            { text: "GUI", link: "/ja/guide/gui" },
            { text: "入力処理", link: "/ja/guide/input-processing" },
            { text: "収集アイテム", link: "/ja/guide/unlockable-items" },
            { text: "カスタム変数", link: "/ja/guide/custom-variables" },
            { text: "スクリプト表記", link: "/ja/guide/script-expressions" },
            { text: "管理テキスト", link: "/ja/guide/managed-text" },
            { text: "ローカライズ", link: "/ja/guide/localization" },
            { text: "メモリ管理", link: "/ja/guide/memory-management" },
            { text: "リソースプロバイダー", link: "/ja/guide/resource-providers" }
        ]
    },
    {
        text: "アドバンスド",
        collapsed: true,
        items: [
            { text: "エンジンアーキテクチャー", link: "/ja/guide/engine-architecture" },
            { text: "エンジンサービス", link: "/ja/guide/engine-services" },
            { text: "カスタムコマンド", link: "/ja/guide/custom-commands" },
            { text: "カスタムコンフィグレーション", link: "/ja/guide/custom-configuration" },
            { text: "カスタムアクターの実装", link: "/ja/guide/custom-actor-implementations" },
            { text: "カスタムアクターシェーダー", link: "/ja/guide/custom-actor-shader" },
            { text: "カスタムスクリプトコンパイラ", link: "/ja/guide/custom-compiler" },
            { text: "ステート管理", link: "/ja/guide/state-management" },
            { text: "インテグレーションの方法", link: "/ja/guide/integration-options" },
            { text: "自動テスト", link: "/ja/guide/automated-testing" },
            { text: "カスタムビルド環境", link: "/ja/guide/custom-build-environment" }
        ]
    }
];

export const zh: DefaultTheme.SidebarItem[] = [
    {
        text: "基础",
        collapsed: true,
        items: [
            { text: "介绍", link: "/zh/guide/" },
            { text: "兼容性", link: "/zh/guide/compatibility" },
            { text: "快速上手", link: "/zh/guide/getting-started" },
            { text: "Naninovel 脚本", link: "/zh/guide/scenario-scripting" },
            { text: "VS Code 扩展", link: "/zh/guide/ide-extension" },
            { text: "故事编辑器", link: "/zh/guide/editor" },
            { text: "示例资源", link: "/zh/guide/samples" }
        ]
    },
    {
        text: "开发",
        collapsed: true,
        items: [
            { text: "属性配置", link: "/zh/guide/configuration" },
            { text: "文本输出窗", link: "/zh/guide/text-printers" },
            { text: "角色", link: "/zh/guide/characters" },
            { text: "背景", link: "/zh/guide/backgrounds" },
            { text: "特殊效果", link: "/zh/guide/special-effects" },
            { text: "音频", link: "/zh/guide/audio" },
            { text: "配音", link: "/zh/guide/voicing" },
            { text: "选项", link: "/zh/guide/choices" },
            { text: "用户界面UI", link: "/zh/guide/gui" },
            { text: "输入处理", link: "/zh/guide/input-processing" },
            { text: "可解锁物件", link: "/zh/guide/unlockable-items" },
            { text: "自定义变量", link: "/zh/guide/custom-variables" },
            { text: "脚本表达式", link: "/zh/guide/script-expressions" },
            { text: "受管文本", link: "/zh/guide/managed-text" },
            { text: "本地化", link: "/zh/guide/localization" },
            { text: "内存管理", link: "/zh/guide/memory-management" },
            { text: "资源加载器", link: "/zh/guide/resource-providers" }
        ]
    },
    {
        text: "高级",
        collapsed: true,
        items: [
            { text: "引擎架构", link: "/zh/guide/engine-architecture" },
            { text: "引擎服务", link: "/zh/guide/engine-services" },
            { text: "自定义指令", link: "/zh/guide/custom-commands" },
            { text: "自定义配置", link: "/zh/guide/custom-configuration" },
            { text: "自定义演出元素实现", link: "/zh/guide/custom-actor-implementations" },
            { text: "自定义演出元素着色器", link: "/zh/guide/custom-actor-shader" },
            { text: "自定义演出脚本编译器", link: "/zh/guide/custom-compiler" },
            { text: "状态管理", link: "/zh/guide/state-management" },
            { text: "整合设置", link: "/zh/guide/integration-options" },
            { text: "自动化测试", link: "/zh/guide/automated-testing" },
            { text: "自定义构建环境", link: "/zh/guide/custom-build-environment" }
        ]
    }
];

export const ru: DefaultTheme.SidebarItem[] = [
    {
        text: "Руководство",
        collapsed: true,
        items: [
            { text: "Введение", link: "/ru/guide/" },
            { text: "Совместимость", link: "/ru/guide/compatibility" },
            { text: "Начало работы", link: "/ru/guide/getting-started" },
            { text: "Конфигурация", link: "/ru/guide/configuration" },
            { text: "Сценарии Naninovel", link: "/ru/guide/scenario-scripting" },
            { text: "Расширение для IDE", link: "/ru/guide/ide-extension" },
            { text: "Текстовые принтеры", link: "/ru/guide/text-printers" },
            { text: "Персонажи", link: "/ru/guide/characters" },
            { text: "Фоны", link: "/ru/guide/backgrounds" },
            { text: "Эффекты переходов", link: "/ru/guide/transition-effects" },
            { text: "Спецэффекты", link: "/ru/guide/special-effects" },
            { text: "Аудио", link: "/ru/guide/audio" },
            { text: "Озвучивание", link: "/ru/guide/voicing" },
            { text: "Видеоролики", link: "/ru/guide/movies" },
            { text: "Выборы", link: "/ru/guide/choices" },
            { text: "Пользовательский интерфейс", link: "/ru/guide/gui" },
            { text: "Система сохранений-загрузок", link: "/ru/guide/save-load-system" },
            { text: "Настройки игры", link: "/ru/guide/game-settings" },
            { text: "Обработка ввода", link: "/ru/guide/input-processing" },
            { text: "Разблокируемые элементы", link: "/ru/guide/unlockable-items" },
            { text: "Пользовательские переменные", link: "/ru/guide/custom-variables" },
            { text: "Выражения сценария", link: "/ru/guide/script-expressions" },
            { text: "Управляемый текст", link: "/ru/guide/managed-text" },
            { text: "Локализация", link: "/ru/guide/localization" },
            { text: "Провайдеры ресурсов", link: "/ru/guide/resource-providers" },
            { text: "Моддинг сообщества", link: "/ru/guide/community-modding" },
            { text: "Консоль разработчика", link: "/ru/guide/development-console" }
        ]
    },
    {
        text: "Программирование",
        collapsed: true,
        items: [
            { text: "Архитектура движка", link: "/ru/guide/engine-architecture" },
            { text: "Сервисы движка", link: "/ru/guide/engine-services" },
            { text: "Пользовательские команды", link: "/ru/guide/custom-commands" },
            { text: "Пользовательская конфигурация", link: "/ru/guide/custom-configuration" },
            { text: "Пользовательские реализации акторов", link: "/ru/guide/custom-actor-implementations" },
            { text: "Пользовательские шейдеры акторов", link: "/ru/guide/custom-actor-shader" },
            { text: "Custom Script Compiler", link: "/ru/guide/custom-compiler" },
            { text: "Управление состоянием", link: "/ru/guide/state-management" },
            { text: "Варианты интеграции", link: "/ru/guide/integration-options" },
            { text: "Пользовательская cреда cборки", link: "/ru/guide/custom-build-environment" }
        ]
    }
];
