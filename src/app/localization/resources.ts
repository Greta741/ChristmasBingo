export const resources = {
  lt: {
    translation: {
      allocation: {
        title: 'Dekoracijų paskirstymas',
        edit: 'Pasirinkti dekoracijas',
        close: 'Uždaryti dekoracijų pasirinkimą',
        addPrompt: 'Pridėti dekoraciją',
        deletePrompt: 'Ištrinti dekoraciją: {{prompt}}',
        resetCategory: 'Atkurti „{{category}}“ dekoracijas',
        resetConfirmation:
          'Kategorijos „{{category}}“ pridėtos dekoracijos bus ištrintos, o pradinės dekoracijos – atkurtos. Sugeneruotos kortelės nesikeis. Ar tęsti?',
        reset: 'Atkurti',
        easy: 'Lengvi',
        medium: 'Vidutiniai',
        hard: 'Sunkūs',
        funny: 'Juokingi',
        decrease: 'Sumažinti: {{category}}',
        increase: 'Padidinti: {{category}}',
        total: 'Pasirinkta: {{total}} / 25',
        random:
          'Likę {{remaining}} langeliai bus atsitiktinai užpildyti iš visų kategorijų.',
        insufficient:
          'Nepakanka dekoracijų. Pridėk dar bent {{missing}} skirtingų dekoracijų.',
        batchSize: 'Kortelių skaičius',
        generate: 'Generuoti korteles',
        generationError:
          'Nepavyko sugeneruoti kortelių. Patikrink dekoracijų paskirstymą.',
        saveError:
          'Nepavyko išsaugoti {{count}} kortelių. Bandyk dar kartą prieš išeidamas iš puslapio.',
        retrySave: 'Išsaugoti dar kartą',
        preview: 'Kortelės peržiūra',
        previewHint:
          'Pasirink dekoracijas ir spausk „Generuoti korteles“ – metas kalėdiniams atradimams!',
      },
      app: {
        name: 'Kalėdinis bingo',
        loading: 'Kraunama…',
        skipToContent: 'Pereiti prie turinio',
        footer: 'Maži atradimai. Daugiau kalėdinės nuotaikos.',
      },
      navigation: {
        label: 'Pagrindinė navigacija',
        create: 'Kurti',
        history: 'Istorija',
        play: 'Žaisti',
      },
      mobileMenu: {
        open: 'Atidaryti meniu',
        close: 'Uždaryti meniu',
        title: 'Meniu',
      },
      hero: {
        startError:
          'Nepavyko pradėti žaidimo. Patikrink dekoracijų paskirstymą ir bandyk dar kartą.',
        eyebrow: 'KALĖDINIS BINGO',
        title: 'Atrask Kalėdas savo kaimynystėje',
        description:
          'Šviečiantys langai, papuoštos eglutės ir maži atradimai! Išeik pasivaikščioti ir surink savo bingo!',
      },
      history: {
        title: 'Mano kortelės',
        pagination: 'Kortelių istorijos puslapiai',
        goToPage: 'Puslapis {{page}}',
        previous: 'Ankstesnis puslapis',
        next: 'Kitas puslapis',
        progress: 'Rasta: {{marked}} / 25',
        loadMore: 'Rodyti daugiau',
        retry: 'Bandyti dar kartą',
        loadError: 'Nepavyko įkelti kortelių.',
        deleteCard: 'Ištrinti kortelę „{{name}}“',
        deleteTitle: 'Ištrinti kortelę?',
        deleteConfirmation:
          'Ar tikrai nori ištrinti kortelę „{{name}}“? Šio veiksmo atšaukti negalima.',
        delete: 'Ištrinti',
        cancel: 'Atšaukti',
        deleteError: 'Nepavyko ištrinti kortelės. Bandyk dar kartą.',
        empty: 'Dar neturi sukurtų kortelių.',
      },
      create: {
        title: 'Kurti bingo',
        description:
          'Tavo kortelė, tavo atradimai. Pasirink dekoracijas kitam žiemos pasivaikščiojimui.',
      },
      play: {
        title: 'Žaisti bingo',
        bingoMessage: 'Linija užpildyta! Tęsk atradimus!',
        fullCardTitle: 'Visos dekoracijos rastos!',
        fullCardMessage: '25 iš 25! Kalėdinė misija įveikta!',
        closeCelebration: 'Uždaryti sveikinimą',
        saveError:
          'Nepavyko išsaugoti žymėjimo. Pakeitimas atšauktas – pabandyk paspausti langelį dar kartą.',
        loadError: 'Nepavyko įkelti kortelės. Bandyk dar kartą.',
        notFound: 'Kortelė nerasta. Ji galėjo būti ištrinta.',
        description:
          'Dairykis kalėdinių dekoracijų. Kiekvienas atradimas priartina prie bingo.',
      },
      print: {
        title: 'Spausdinti korteles',
        description:
          'Kalėdiniai atradimai ir popieriuje. Pasiimk bingo kortelę į pasivaikščiojimą.',
        empty: 'Pirmiausia susikurk korteles, kurias norėsi spausdinti.',
        create: 'Kurti korteles',
      },
      language: {
        label: 'Programėlės kalba',
        lt: 'Lietuvių',
        en: 'English',
      },
      persistence: {
        readTitle: 'Nepavyko perskaityti išsaugotų duomenų',
        writeTitle: 'Nepavyko išsaugoti duomenų',
        description:
          'Naršyklėje buvę duomenys nebuvo ištrinti. Kol klaida neišspręsta, nauji pakeitimai nebus išsaugomi.',
      },
    },
  },
  en: {
    translation: {
      allocation: {
        title: 'Decoration allocation',
        edit: 'Choose decorations',
        close: 'Close decoration selection',
        addPrompt: 'Add a decoration',
        deletePrompt: 'Delete decoration: {{prompt}}',
        resetCategory: 'Restore “{{category}}” decorations',
        resetConfirmation:
          'Custom decorations in “{{category}}” will be deleted and the original decorations restored. Generated cards will stay unchanged. Continue?',
        reset: 'Restore',
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
        funny: 'Funny',
        decrease: 'Decrease: {{category}}',
        increase: 'Increase: {{category}}',
        total: 'Selected: {{total}} / 25',
        random:
          'The remaining {{remaining}} cells will be randomly filled from all categories.',
        insufficient:
          'Not enough decorations. Add at least {{missing}} more distinct decorations.',
        batchSize: 'Number of cards',
        generate: 'Generate cards',
        generationError:
          'Could not generate cards. Check the decoration allocation.',
        saveError:
          'Could not save {{count}} cards. Try again before leaving this page.',
        retrySave: 'Retry saving',
        preview: 'Card preview',
        previewHint:
          'Choose your decorations and press “Generate cards” – time for some Christmas discoveries!',
      },
      app: {
        name: 'Christmas Bingo',
        loading: 'Loading…',
        skipToContent: 'Skip to content',
        footer: 'Small discoveries. More Christmas cheer.',
      },
      navigation: {
        label: 'Main navigation',
        create: 'Create',
        history: 'History',
        play: 'Play',
      },
      mobileMenu: {
        open: 'Open menu',
        close: 'Close menu',
        title: 'Menu',
      },
      hero: {
        startError:
          'Could not start the game. Check your decoration allocation and try again.',
        eyebrow: 'CHRISTMAS BINGO',
        title: 'Discover Christmas in your neighbourhood',
        description:
          'Glowing windows, decorated Christmas trees, and little discoveries! Go for a walk and complete your bingo!',
      },
      history: {
        title: 'My cards',
        pagination: 'Card history pages',
        goToPage: 'Page {{page}}',
        previous: 'Previous page',
        next: 'Next page',
        progress: 'Found: {{marked}} / 25',
        loadMore: 'Show more',
        retry: 'Try again',
        loadError: 'Could not load cards.',
        deleteCard: 'Delete card “{{name}}”',
        deleteTitle: 'Delete card?',
        deleteConfirmation:
          'Are you sure you want to delete “{{name}}”? This cannot be undone.',
        delete: 'Delete',
        cancel: 'Cancel',
        deleteError: 'Could not delete the card. Try again.',
        empty: 'You have not created any cards yet.',
      },
      create: {
        title: 'Create bingo',
        description:
          'Your card, your discoveries. Choose decorations for your next winter walk.',
      },
      play: {
        title: 'Play bingo',
        bingoMessage: 'Line complete! Keep exploring!',
        fullCardTitle: 'All decorations found!',
        fullCardMessage: '25 out of 25! Christmas mission complete!',
        closeCelebration: 'Dismiss celebration',
        saveError:
          'Could not save the mark. The change was undone; try pressing the cell again.',
        loadError: 'Could not load the card. Try again.',
        notFound: 'Card not found. It may have been deleted.',
        description:
          'Look around for Christmas decorations. Every discovery brings you closer to bingo.',
      },
      print: {
        title: 'Print cards',
        description:
          'Take your Christmas discoveries onto paper and bring a bingo card on your walk.',
        empty: 'First create the cards you want to print.',
        create: 'Create cards',
      },
      language: {
        label: 'App language',
        lt: 'Lietuvių',
        en: 'English',
      },
      persistence: {
        readTitle: 'Could not read saved data',
        writeTitle: 'Could not save data',
        description:
          'Existing browser data was not deleted. New changes will not be saved until the problem is resolved.',
      },
    },
  },
} as const
