import Plugins from './plugins'

let status = false

function plugins(){
    $.ajax({
        url: "./plugins.json",
        dataType: 'text',
        success: (data)=>{
            const list = Plugins.get();
            try {
                const injection = JSON.parse(data);
                injection.forEach((plugin, i) => {
                    if (!list.find(e => e.url === plugin.url)) {
                        Plugins.add({
                            url: plugin.url,
                            status: 1,
                            name: plugin.name || 'Plugin',
                            author: plugin.author || 'Unknown'
                        })
                    }
                })
            } catch (e){
                console.log('Perosnal', e);
            }
        }
    })
}

function init(){
    $.ajax({
        url: "./personal.lampa",
        dataType: 'text',
        success: ()=>{
            status = true
        }
    })

    plugins()
}

function confirm(){
    return status
}

export default {
    init,
    confirm
}