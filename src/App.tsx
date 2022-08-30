
import { useState } from 'react';
import { isTemplateExpression } from 'typescript';
import styles from './App.module.css';
import poweredImage from './assets/powered.png'
import { levels, calculateImc, Level} from './helpers/imc';
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png'
const App = () => {
  const [heightField, setHeightField] = useState<number>(0); //associa o campo altura
  const [weightField, setWeightField] = useState<number>(0); //associa o campo peso
  const [toShow, setToShow] = useState<Level | null>(null); //state que armazena o item pra ser exibido
  const handleCalculateButton = () => {  // cria a função calcular
    if(heightField && weightField){
      setToShow(calculateImc(heightField,weightField))

    }else{
      alert("Digite todos os campos primeiro!")
    }
  }
  const handleBackButton = () => { // botao de retorno
    setToShow(null); //zera tudas as contas
    setHeightField(0); // zera o campo
    setWeightField(0); // zera o campo


  }
  return(
  <div className= {styles.main}>
    <header>
        <div className={styles.headerContainer}>  {/*vermelho*/}
          <img src={poweredImage} alt="" width={150}/>
        </div>
    </header>
        <div className={styles.container}>
                <div className={styles.leftSide}> {/*azul*/}
                  <h1>Calcule o seu IMC</h1>
                  <p>IMC é a sigla de Índice de Massa Corporea, parâmetro adotado pela Organização Mundial da 
                    Saúde para calcular o peso ideal de cada pessoa.
                  </p>
                  
                  <input // campo altura -> criar lá em cima tb
                  type = "number"
                  placeholder="Digite a sua altura: Ex: 1.5 (em metros)"
                  value={heightField >0 ? heightField : ''}
                  onChange={e => setHeightField(parseFloat(e.target.value))}
                  disabled = {toShow ? true : false} // disabled é uma prop que desabilita o campo se ele está sendo usado para q não possa ser mudado. se tiver mostrando algo(toShow) ele fica desabilitado para alterações(true) se não estiver mostrando nada (fale) fica habilitado para alterações
                  />
                  <input //campo peso -> criar lá em cima tb
                  type = "number"
                  placeholder="Digite seu peso: Ex: 73.0 (em Kg)"
                  value={weightField >0 ? weightField : ''}
                  onChange={e => setWeightField(parseFloat(e.target.value))}
                  disabled = {toShow ? true : false}
                  />
                  <button onClick={handleCalculateButton} disabled = {toShow ? true : false}>Calcular</button>
                  
                </div>
                <div className={styles.rightSide}>          {/*verde*/}
                {!toShow &&
                  <div className = {styles.grid}>           {/*como só vai exibir opções é melhor um grid*/}
                    {levels.map((item, key) => (            //*pega os atributos que foram cadastrados no lado esquerdo automaticamente*/
                      <GridItem key = {key} item={item} />
                    ))}
                  </div>
                }
                { toShow &&
                <div className = {styles.rightBig}>
                  <div className={styles.rightArrow} onClick={handleBackButton}>
                    <img src={leftArrowImage} alt="" width={25}/>
                  </div>
                  <GridItem item={toShow}/>
                </div>

                }
                </div>

        </div>
  </div>
);
}

export default App;
