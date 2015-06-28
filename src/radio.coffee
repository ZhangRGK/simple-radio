
class Radio extends SimpleModule
    _tpl: """
    <div class="simple-radio">
        <div class="dot"></div>
    </div>
    """
    _init: ->
        @radio = $(@opts.el).first()
        throw new Error "simple-radio: el option is invalid" if @radio.length == 0
        # set el size opts > prop > default
        @size = 32
        if @opts.size
            @size = @opts.size
        else if @radio.data "size"
            @size = @radio.data "size"
        @_render()

    _render: ->
        @radio.hide()
        @el = $(@_tpl).insertAfter @radio
        @el.css
            "height": @size
            "width": @size * 1.6
            "border-radius": @size
        # init state
        @state = if @radio.attr("value") and !!@radio.attr("value") then "on" else "off"
        @toggle @state
        # set disable after state
        @disabled = @radio.prop "disabled"
        @disable @disabled
        @_bind()

    _bind: ->
        @el.on("click", (event)=>
            event.stopPropagation()
            @toggle(if @state == "on" then "off" else "on")
        )

    disable: (is_disable)->
        if is_disable
            @disabled = true
            @el.addClass "disabled"
        else
            @disabled = false
            @el.removeClass "disabled"

    toggle: (state)->
        if @disabled
            return
        @state = state
        if @state == "on"
            @el.addClass "on"
            @radio.attr("value", "on")
        else
            @el.removeClass "on"
            @radio.attr("value", "off")

    destroy: ->
        @radio.show()
        @el.remove()


radio = (opts) ->
    new Radio(opts)
