import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class CardItem {
  String? imgUrl;
  String? title;
  String? description;

  CardItem({this.imgUrl, this.title, this.description});
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // TRY THIS: Try running your application with "flutter run". You'll see
        // the application has a blue toolbar. Then, without quitting the app,
        // try changing the seedColor in the colorScheme below to Colors.green
        // and then invoke "hot reload" (save your changes or press the "hot
        // reload" button in a Flutter-supported IDE, or press "r" if you used
        // the command line to start the app).
        //
        // Notice that the counter didn't reset back to zero; the application
        // state is not lost during the reload. To reset the state, use hot
        // restart instead.
        //
        // This works for code too, not just values: Most code changes can be
        // tested with just a hot reload.
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'My stateless widget'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int idx = 1;

  List<CardItem> cardsItems = [
    CardItem(
        imgUrl: 'assets/react.png',
        title: 'React',
        description:
            'React — відкрита JavaScript бібліотека для створення інтерфейсів користувача, яка покликана вирішувати проблеми часткового оновлення вмісту вебсторінки, з якими стикаються в розробці односторінкових застосунків'),
    CardItem(
        imgUrl: 'assets/vu.png',
        title: 'Vue',
        description:
            "Vue.js — JavaScript-фреймворк, що використовує шаблон MVVM для створення інтерфейсів користувача на основі моделей даних, через реактивне зв'язування даних"),
    CardItem(
        imgUrl: 'assets/angular.png',
        title: 'Angular',
        description:
            'Angular — написаний на TypeScript front-end фреймворк з відкритим кодом, який розробляється під керівництвом Angular Team Архівовано 18 серпня 2021 у Wayback Machine. у компанії Google, а також спільнотою приватних розробників та корпорацій'),
    CardItem(
        imgUrl: 'assets/solid.png',
        title: 'SolidJS',
        description:
            "Solid is an open-source project supported by a team of public contributors. It's distributed under an MIT license")
  ];

  void _nextPage() {
    if (idx == cardsItems.length - 1) {
      setState(() {
        idx = 0;
      });
      return;
    }

    setState(() {
      idx++;
    });
  }

  void _prevPage() {
    if (idx == 0) {
      setState(() {
        idx = cardsItems.length - 1;
      });
      return;
    }

    setState(() {
      idx--;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: Text(widget.title),
          centerTitle: true,
        ),
        body: Center(
          child: Container(
            margin: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Card(
                  color: Colors.lime,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20)),
                  elevation: 20,
                  child: Padding(
                    padding: const EdgeInsets.all(40.0),
                    child: Column(
                      children: [
                        Image(
                            width: 200,
                            height: 200,
                            image: AssetImage(cardsItems[idx].imgUrl!)),
                        Text(cardsItems[idx].title!,
                            style: TextStyle(
                                fontSize: 28, fontWeight: FontWeight.bold)),
                        Text(
                          cardsItems[idx].description!,
                          textAlign: TextAlign.center,
                        )
                      ],
                    ),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    OutlinedButton(
                        onPressed: _prevPage, child: Text('Prev page')),
                    OutlinedButton(
                        onPressed: _nextPage, child: Text('Next page'))
                  ],
                )
              ],
            ),
          ),
        ));
  }
}
